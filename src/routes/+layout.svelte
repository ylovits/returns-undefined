<script lang="ts">
	import "./app.less";
	import Filters from "$lib/filters.svelte";
	import { onMount } from "svelte";

	import type { PlayersState, ScoresState } from "$types";
	import { initialPlayerObject, shapes } from "$lib/players";
	import { setContext } from 'svelte';

	let props = $props();

	let currentPage = $state<string>(props.data.pageName);
	let players = $state<PlayersState>({});
	let scores = $state<ScoresState>({});
	setContext('players', { players });
	setContext('scores', { scores });


	$effect(() => {
		if (props.data.pageName) currentPage = props.data.pageName;
	});

	onMount(() => {
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
			setContext('players', { players });
			scores = {};
			setContext('scores', { scores });
			window.removeEventListener("gamepadconnected", handleGamepadConnected);
			window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
		};
	});
</script>

<div id="app">
	<main class={currentPage}>
		{@render props.children()}
		<Filters />
	</main>
</div>


