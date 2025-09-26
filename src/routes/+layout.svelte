<script lang="ts">
	import "./app.less";
	import Filters from "$lib/filters.svelte";
	import Timer from "$lib/Timer.svelte";
	import RestartButton from "$lib/RestartButton.svelte";
	import { onMount } from "svelte";
	import type { PlayersState, ScoresState, GameState } from "$types";
	import { initialPlayerObject, shapes } from "$lib/players";
	import { setContext } from "svelte";
	import useLocalStorage from "$lib/storage.svelte";
	import { goto } from "$app/navigation";
import { page } from "$app/stores";

	let props = $props();

	let currentPage = $state<string>(props.data.pageName);
	let players = $state<PlayersState>({});
	const score = useLocalStorage("score");
	let scores = $state<ScoresState>(score.value || {});
	let readyCheckCount = $state<number>(0);

	const gameStateStorage = useLocalStorage("gameState");
	let gameState = $state<GameState>({
		timerEnabled: false,
		timerMinutes: 15,
		timeRemaining: 0,
		questionsAnswered: 0,
		gameEnded: false
	});

	let timerInterval: ReturnType<typeof setInterval> | null = null;

	const setReadyCheckCount = (count: number) => {
		readyCheckCount = count;
	};

	const getReadyCheckCount = () => readyCheckCount;

	// Check if we need to create a mouse player (no controllers connected)
	const checkForMousePlayer = () => {
		const hasActiveControllers = Object.values(players).some(player => player.active && !player.isMouse);

		if (!hasActiveControllers) {
			// Create mouse player at index 4 (mouse shape in shapes array)
			const mouseIndex = 4;
			if (!players[mouseIndex] || !players[mouseIndex].isMouse) {
				players[mouseIndex] = {
					...initialPlayerObject,
					name: "mouse",
					active: true,
					isMouse: true,
				};
				scores[mouseIndex] = scores[mouseIndex] || 0;
			}
		} else {
			// Remove mouse player if controllers are connected
			const mouseIndex = 4;
			if (players[mouseIndex]?.isMouse) {
				players[mouseIndex].active = false;
			}
		}
	};

	const startTimer = () => {
		if (gameState.timerEnabled && gameState.timeRemaining > 0) {
			timerInterval = setInterval(() => {
				gameState.timeRemaining -= 1;
				gameStateStorage.value = { ...gameState };

				if (gameState.timeRemaining <= 0) {
					// Try to extract current question index from URL
					const currentUrl = $page.url.pathname;
					const questionMatch = currentUrl.match(/\/trivia\/(\d+)/);
					const questionIndex = questionMatch ? parseInt(questionMatch[1]) : undefined;
					endGame(questionIndex);
				}
			}, 1000);
		}
	};

	const stopTimer = () => {
		if (timerInterval) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
	};

	const endGame = (currentQuestionIndex?: number) => {
		gameState.gameEnded = true;
		// If we know the current question index, update questionsAnswered
		if (currentQuestionIndex !== undefined) {
			gameState.questionsAnswered = currentQuestionIndex + 1; // +1 because index is 0-based
		}
		stopTimer();
		gameStateStorage.value = { ...gameState };
		goto("/trivia/results");
	};

	const updateGameState = (updates: Partial<GameState>) => {
		const newState = { ...gameState, ...updates };
		gameState = newState;
		gameStateStorage.value = newState;
	};

	// svelte-ignore state_referenced_locally
	setContext("players", { players });
	// svelte-ignore state_referenced_locally
	setContext("scores", { scores });
	// svelte-ignore state_referenced_locally
	setContext("readyCheck", { setReadyCheckCount, getReadyCheckCount });

	// Create a getter function for reactive access to gameState
	const getGameState = () => gameState;
	// svelte-ignore state_referenced_locally
	setContext("gameState", { gameState, getGameState, startTimer, stopTimer, endGame: () => endGame(), updateGameState });

	$effect(() => {
		if (props.data.pageName) currentPage = props.data.pageName;
	});

	// Watch for storage changes and sync gameState
	$effect(() => {
		if (gameStateStorage.value) {
			// Only update if there are actual differences
			if (gameState.timerEnabled !== gameStateStorage.value.timerEnabled ||
				gameState.timeRemaining !== gameStateStorage.value.timeRemaining ||
				gameState.questionsAnswered !== gameStateStorage.value.questionsAnswered ||
				gameState.gameEnded !== gameStateStorage.value.gameEnded) {
				gameState = { ...gameStateStorage.value };
			}
		}
	});

	onMount(() => {
		const existingGamePads = navigator.getGamepads();
		if (existingGamePads.length > 0) {
			existingGamePads.forEach((gamepad, index) => {
				if (gamepad) {
					players[index] = {
						...initialPlayerObject,
						name: shapes[index],
						gamepad,
						active: true,
					};
				}
			});
		}

		// Check if we need a mouse player after processing existing gamepads
		checkForMousePlayer();

		const handleGamepadConnected = (event: GamepadEvent) => {
			players[event.gamepad.index] = {
				...initialPlayerObject,
				name: shapes[event.gamepad.index],
				active: true,
				gamepad: event.gamepad,
			};
			scores[event.gamepad.index] = scores[event.gamepad.index] || 0;

			// Check if we need to remove mouse player
			checkForMousePlayer();
		};

		const handleGamepadDisconnected = (event: GamepadEvent) => {
			const dc = players[event.gamepad.index];

			if (dc) {
				dc.active = false;
				dc.gamepad = null;
				dc.x = 0;
				dc.y = 0;
			}

			// Check if we need to create mouse player
			checkForMousePlayer();
		};

		window.addEventListener("gamepadconnected", handleGamepadConnected);
		window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

		return () => {
			players = {};
			setContext("players", { players });
			scores = {};
			setContext("scores", { scores });
			stopTimer();
			window.removeEventListener("gamepadconnected", handleGamepadConnected);
			window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
		};
	});
</script>

<div id="app">
	<Timer />
	<RestartButton />
	<div class="filter"></div>
	<main class={currentPage}>
		{@render props.children()}
		<Filters />
	</main>
</div>
