<script lang="ts">
	import type { PayersState, Shapes } from "$types";
	import { changeSelection, initialPlayerObject, shapes, shapeSVGs } from "./players";

	import { getContext, onMount } from "svelte";
	import { introControls } from "./gamepad";

	let players = $state<PayersState>({});
	let answerPositions = $state<number[]>([]);

	const playersContext = getContext<{ players: PayersState }>("players");
	let props = $props();

	const multiplier = props.pageName === "landing" ? 5 : 1;
	console.log("🚀 - multiplier:", multiplier);

	onMount(() => {
		let frame = requestAnimationFrame(function update() {
			players = playersContext.players || {};
			if (!answerPositions.length && props.answerElements) {
				answerPositions = props.answerElements.map((elm: HTMLElement) => {
					return elm.getBoundingClientRect().top - props.wrapperElm.getBoundingClientRect().top;
				});
			}

			Object.keys(players).forEach((playerKey) => {
				const myGamepad = navigator.getGamepads()[Number(playerKey)];
				if (myGamepad) {
					const { pressing, yAxisSum, xAxisSum } = introControls(myGamepad);

					const rumble = props.pageName === "landing" && pressing;

					const now = Date.now();
					const timeSinceLastMove = now - players[myGamepad.index].lastMovement;

					if (props.pageName && props.pageName !== "landing" && answerPositions) {
						if (Math.abs(yAxisSum) > 0.5 && timeSinceLastMove > 200) {
							changeSelection(yAxisSum > 0 ? "down" : "up", players[myGamepad.index], answerPositions.length);
							players[myGamepad.index].lastMovement = Date.now();
							players[myGamepad.index].y = answerPositions[players[myGamepad.index].currentSelection] * 2.95;
						} else {
							players[myGamepad.index].y = answerPositions[players[myGamepad.index].currentSelection] * 2.95;
						}
					} else {
						players[myGamepad.index].y = yAxisSum * 60;
					}

					players[myGamepad.index].pressing = rumble;
					players[myGamepad.index].x = xAxisSum * 60;

					if (rumble) {
						myGamepad.vibrationActuator.playEffect("trigger-rumble", {
							startDelay: 0,
							duration: 5,
							weakMagnitude: 1,
							strongMagnitude: 1,
						});
						players[myGamepad.index].x += Math.floor(Math.random() * 21 * multiplier) - 11 * multiplier;
						players[myGamepad.index].y += Math.floor(Math.random() * 21 * multiplier) - 10 * multiplier;
					}
				}
			});

			frame = requestAnimationFrame(update);
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<div class={`players ${props.pageName === "landing" ? "filter-md" : "filter-text"}`}>
	{#key players}
		{#each shapes as shape, i}
			{@const { active, pressing, x, y } = players && players[i] && players[i].active ? players[i] : initialPlayerObject}
			<svg
				class="{shape} player {active ? 'active' : ''} {pressing ? 'pressing' : ''}"
				viewBox="0 0 377 377"
				style={`overflow: visible; ${x ? "transform: rotate(" + (x / Math.abs(x)) * 5 + "deg)" : ""}`}
			>
				<g style={`transform: translate(${x * 2}px, ${y * 2}px)`}>
					{@html shapeSVGs[shape as Shapes]}
				</g>
			</svg>
		{/each}
	{/key}
</div>
