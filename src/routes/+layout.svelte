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
	import { base } from "$app/paths";
import { page } from "$app/stores";

	let props = $props();

	let currentPage = $state<string>(props.data?.pageName || "");
	const playersStorage = useLocalStorage("players");
	let players = $state<PlayersState>(playersStorage.value || {});
	const score = useLocalStorage("score");
	let displayScores = $state<ScoresState>(score.value || {}); // Display scores (shown in UI)
	let gameScores = $state<ScoresState>(score.value || {}); // Live game scores (updated when answering)
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

	// Function to save players state to localStorage
	const savePlayers = () => {
		playersStorage.value = { ...players };
	};

	// Function to save scores to localStorage
	const saveScores = () => {
		score.value = { ...displayScores };
	};

	// Handle mouse player creation/removal when controllers connect/disconnect
	const handleMousePlayerForControllers = () => {
		const hasActiveControllers = Object.values(players).some(player => player.active && !player.isMouse);
		const mouseIndex = 4;

		// If controllers are connected and we have a mouse player, remove it (unless manually added)
		if (hasActiveControllers && players[mouseIndex]?.isMouse && !players[mouseIndex].manuallyAdded) {
			players[mouseIndex].active = false;
			savePlayers();
		}
	};

	// Function to manually add/remove mouse player (for + button)
	const toggleMousePlayer = () => {
		const mouseIndex = 4;

		if (players[mouseIndex]?.active) {
			// Remove mouse player
			players[mouseIndex].active = false;
			players[mouseIndex].manuallyAdded = false;
		} else {
			// Add mouse player
			players[mouseIndex] = {
				...initialPlayerObject,
				name: "mouse",
				active: true,
				isMouse: true,
				manuallyAdded: true,
			};
			displayScores[mouseIndex] = displayScores[mouseIndex] || 0;
			gameScores[mouseIndex] = gameScores[mouseIndex] || 0;
		}
		savePlayers();
		saveScores();
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
		goto(`${base}/trivia/results`);
	};

	const updateGameState = (updates: Partial<GameState>) => {
		const newState = { ...gameState, ...updates };
		gameState = newState;
		gameStateStorage.value = newState;
	};

	// Function to update a specific player
	const updatePlayer = (playerIndex: number, updates: Partial<typeof players[0]>) => {
		if (players[playerIndex]) {
			players[playerIndex] = { ...players[playerIndex], ...updates };
		}
	};

	// Function to reset all player answers
	const resetPlayerAnswers = () => {
		Object.keys(players).forEach((playerKey) => {
			const playerIndex = Number(playerKey);
			if (players[playerIndex]) {
				players[playerIndex] = {
					...players[playerIndex],
					x: 0,
					y: 0,
					lastMovement: Date.now(),
					currentSelection: 0,
					selected: false
				};
			}
		});
	};

	// svelte-ignore state_referenced_locally
	setContext("players", { players, toggleMousePlayer, updatePlayer, resetPlayerAnswers });
	// Function to update a player's score
	const updatePlayerScore = (playerIndex: number, newScore: number) => {
		gameScores[playerIndex] = newScore;
	};

	// Create reactive scores context - use gameScores for live updates, displayScores for UI
	let scoresContext = $state({
		get scores() { return gameScores; },
		get displayScores() { return displayScores; },
		updateDisplay: () => {
			displayScores = { ...gameScores };
			score.value = { ...gameScores };
		},
		updatePlayerScore
	});

	// svelte-ignore state_referenced_locally
	setContext("scores", scoresContext);
	// svelte-ignore state_referenced_locally
	setContext("readyCheck", { setReadyCheckCount, getReadyCheckCount });

	// Create a getter function for reactive access to gameState
	const getGameState = () => gameState;
	// svelte-ignore state_referenced_locally
	setContext("gameState", { gameState, getGameState, startTimer, stopTimer, endGame: () => endGame(), updateGameState });

	$effect(() => {
		if (props.data?.pageName) currentPage = props.data.pageName;
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
		// First, load saved players from localStorage
		const savedPlayers = playersStorage.value || {};

		// Load scores from localStorage first
		if (score.value && Object.keys(score.value).length > 0) {
			displayScores = { ...score.value };
			gameScores = { ...score.value }; // Initialize gameScores with the same values
		}

		// Restore gamepad players and update with current gamepad references
		const existingGamePads = navigator.getGamepads();
		if (existingGamePads.length > 0) {
			existingGamePads.forEach((gamepad, index) => {
				if (gamepad) {
					// Use saved player data if available, otherwise create new
					players[index] = {
						...(savedPlayers[index] || initialPlayerObject),
						name: shapes[index],
						gamepad,
						active: true,
						isMouse: false, // Ensure gamepad players aren't marked as mouse
					};
				}
			});
		}

		// Restore mouse players from saved state (mouse players don't need gamepad references)
		Object.keys(savedPlayers).forEach(key => {
			const playerIndex = Number(key);
			const savedPlayer = savedPlayers[playerIndex];
			if (savedPlayer?.isMouse && savedPlayer.active) {
				// Only restore if it's not already a gamepad player
				if (!players[playerIndex] || !players[playerIndex].gamepad) {
					players[playerIndex] = {
						...savedPlayer,
						gamepad: null, // Ensure no stale gamepad reference
					};
					// Ensure score is initialized for restored mouse player
					displayScores[playerIndex] = displayScores[playerIndex] || 0;
					gameScores[playerIndex] = gameScores[playerIndex] || 0;
				}
			}
		});

		// Handle mouse player after processing existing gamepads
		handleMousePlayerForControllers();

		// Save initial players state after loading and processing
		savePlayers();
		saveScores();

		const handleGamepadConnected = (event: GamepadEvent) => {
			players[event.gamepad.index] = {
				...initialPlayerObject,
				name: shapes[event.gamepad.index],
				active: true,
				gamepad: event.gamepad,
			};
			displayScores[event.gamepad.index] = displayScores[event.gamepad.index] || 0;
			gameScores[event.gamepad.index] = gameScores[event.gamepad.index] || 0;

			// Handle mouse player when controller connects
			handleMousePlayerForControllers();
			savePlayers();
			saveScores();
		};

		const handleGamepadDisconnected = (event: GamepadEvent) => {
			const dc = players[event.gamepad.index];

			if (dc) {
				dc.active = false;
				dc.gamepad = null;
				dc.x = 0;
				dc.y = 0;
			}

			// Handle mouse player when controller disconnects
			handleMousePlayerForControllers();
			savePlayers();
		};

		window.addEventListener("gamepadconnected", handleGamepadConnected);
		window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

		return () => {
			players = {};
			setContext("players", { players });
			displayScores = {};
			gameScores = {};
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
