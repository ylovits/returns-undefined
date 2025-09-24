<script lang="ts">
	import "./app.less";
	import Filters from "$lib/filters.svelte";
	import { onMount } from "svelte";
	import type { PlayersState, ScoresState } from "$types";
	import { initialPlayerObject, shapes } from "$lib/players";
	import { setContext } from "svelte";
	import useLocalStorage from "$lib/storage.svelte";

	let props = $props();

	let currentPage = $state<string>(props.data.pageName);
	let players = $state<PlayersState>({});
	const score = useLocalStorage("score");
	let scores = $state<ScoresState>(score.value || {});
	let readyCheckCount = $state<number>(0);

	const setReadyCheckCount = (count: number) => {
		readyCheckCount = count;
	};

	const getReadyCheckCount = () => readyCheckCount;

	// svelte-ignore state_referenced_locally
	setContext("players", { players });
	// svelte-ignore state_referenced_locally
	setContext("scores", { scores });
	// svelte-ignore state_referenced_locally
	setContext("readyCheck", { setReadyCheckCount, getReadyCheckCount });

	$effect(() => {
		if (props.data.pageName) currentPage = props.data.pageName;
	});

	onMount(() => {
		console.log("🚀 - onMount  LAYOUT- score.value:", scores)

		const existingGamePads = navigator.getGamepads();
		if (existingGamePads.length > 0) {
			existingGamePads.forEach((gamepad, index) => {
				if (gamepad) {
					players[index] = {
						...players[index],
						gamepad,
						active: true,
					};
				}
			});
		}

		const handleGamepadConnected = (event: GamepadEvent) => {
			players[event.gamepad.index] = {
				...initialPlayerObject,
				name: shapes[event.gamepad.index],
				active: true,
				gamepad: event.gamepad,
			};
			scores[event.gamepad.index] = scores[event.gamepad.index] || 0;
		};

		const handleGamepadDisconnected = (event: GamepadEvent) => {
			const dc = players[event.gamepad.index];

			if (dc) {
				dc.active = false;
				dc.gamepad = null;
				dc.x = 0;
				dc.y = 0;
			}
		};

		window.addEventListener("gamepadconnected", handleGamepadConnected);
		window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

		return () => {
			players = {};
			setContext("players", { players });
			scores = {};
			setContext("scores", { scores });
			window.removeEventListener("gamepadconnected", handleGamepadConnected);
			window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
		};
	});
</script>

<div id="app">
	<div class="filter"></div>
	<main class={currentPage}>
		{@render props.children()}
		<Filters />
	</main>
</div>
