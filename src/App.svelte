<script lang="ts">
	import Filters from "./lib/filters.svelte";
	import { onMount } from "svelte";
	import { introControls } from "./utils/gamepad";
	import type { Shapes, PayersState } from "./types";
	import { initialPlayerObject, shapeSVGs, shapes } from "./constants";

	let players = $state<PayersState>({});

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

		let frame = requestAnimationFrame(function update() {
			Object.keys(players).forEach((playerKey) => {
				const myGamepad = navigator.getGamepads()[Number(playerKey)];
				if (myGamepad) {
					const { pressing, yAxisSum, xAxisSum } = introControls(myGamepad);

					players[myGamepad.index].pressing = pressing;
					players[myGamepad.index].x = xAxisSum * 60;
					players[myGamepad.index].y = yAxisSum * 60;

					if (pressing) {
						myGamepad.vibrationActuator.playEffect("trigger-rumble", {
							startDelay: 0,
							duration: 5,
							weakMagnitude: 1,
							strongMagnitude: 1,
						});
						players[myGamepad.index].x += Math.floor(Math.random() * 201) - 101;
						players[myGamepad.index].y += Math.floor(Math.random() * 201) - 100;
					}
				}
			});

			frame = requestAnimationFrame(update);
		});

		return () => {
			players = {};
			window.removeEventListener("gamepadconnected", handleGamepadConnected);
			window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
			cancelAnimationFrame(frame);
		};
	});
</script>

<main>
	<div class="players">
		{#key players}
			{#each shapes as shape,i }
			{@const { active, pressing, x, y, name } = players[i]?.active ? players[i] : initialPlayerObject  }
			<svg
				class="{shape} player {active ? 'active' : ''} {pressing ? 'pressing' : ''}"
				style={`transform: translate(${x}px, ${y}px) scale(${active ? "1" : "0.7"})`}
				viewBox="0 0 377 377"
			>
				{@html shapeSVGs[shape as Shapes]}
			</svg>
		{/each}
	{/key}
	</div>
	<Filters />
</main>
