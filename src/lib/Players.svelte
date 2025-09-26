<script lang="ts">
	import type { PlayersState, ScoresState } from "$types";
	import Player from "$lib/Player.svelte";
	import { changeSelection, initialPlayerObject, shapes } from "./players";
	import { getContext, onMount } from "svelte";
	import { mainControls, inQuizControls } from "./gamepad";
	import useLocalStorage from "$lib/storage.svelte";

	let players = $state<PlayersState>({});
	const score = useLocalStorage("score");
	let scores = $state<ScoresState>({});
	let answerPositions = $state<number[]>([]);

	const playersContext = getContext<{ players: PlayersState }>("players");
	const scoresContext = getContext<{ scores: ScoresState }>("scores");
	const { setReadyCheckCount, getReadyCheckCount } = getContext<{
		setReadyCheckCount: (count: number) => void;
		getReadyCheckCount: () => number;
	}>("readyCheck");

	let props = $props();

	const multiplier = props.pageName === "landing" ? 5 : 1 / 2;

	onMount(() => {
		if (!scoresContext.scores) {
			scoresContext.scores = score.value;
		}

		let frame = requestAnimationFrame(function update() {
			players = playersContext.players || {};
			// let currentScore = score.value || {};
			scores = scoresContext.scores || {};
			const currentReadyCheckCount = getReadyCheckCount();

			Object.keys(players).forEach((playerKey) => {
				const playerIndex = Number(playerKey);
				const player = players[playerIndex];
				const myGamepad = navigator.getGamepads()[playerIndex];

				// Handle mouse players separately
				if (player.isMouse && !myGamepad) {
					const landingPage = props.pageName === "landing";

					// For mouse players, position is already handled by click handlers
					// Just ensure position is maintained when selected
					if (!landingPage && answerPositions.length > 0 && !player.selected) {
						player.y = answerPositions[player.currentSelection] * multiplier;
					}
				} else if (myGamepad) {
					const player = players[myGamepad.index];

					const landingPage = props.pageName === "landing";
					const { pressing, yAxisSum, xAxisSum } = mainControls(myGamepad);

					if (landingPage) {
						player.y = player.selected ? player.y : yAxisSum * 60;
						if (pressing) {
							myGamepad.vibrationActuator.playEffect("trigger-rumble", {
								startDelay: 0,
								duration: 5,
								weakMagnitude: 1,
								strongMagnitude: 1,
							});
							player.x += Math.floor(Math.random() * 21 * multiplier) - 11 * multiplier;
							player.y += Math.floor(Math.random() * 21 * multiplier) - 10 * multiplier;
						}
					} else {
						if (!answerPositions.length && props.answerElements) {
							answerPositions = props.answerElements.map((elm: HTMLElement) => {
								return elm.getBoundingClientRect().top - props.wrapperElm.getBoundingClientRect().top;
							});
						}
						const { moveDown, moveUp, select } = inQuizControls(myGamepad);
						const now = Date.now();
						const timeSinceLastMove = now - player.lastMovement;

						if (answerPositions && !player.selected) {
							if ((moveDown || moveUp) && timeSinceLastMove > 200) {
								changeSelection(moveDown ? "down" : "up", player, answerPositions.length);
								player.lastMovement = Date.now();
								player.y = answerPositions[player.currentSelection] * multiplier;
							} else {
								player.y = answerPositions[player.currentSelection] * multiplier;
							}
						} else {
							player.y = player.selected ? player.y : yAxisSum * 60;
						}

						if (select && timeSinceLastMove > 200) {
							player.lastMovement = Date.now();
							if (!!player.currentSelection || player.currentSelection == 0) {
								scoresContext.scores[myGamepad.index] =
									player.currentSelection === props.question.correctAnswerIndex && !player.selected
										? scores[myGamepad.index] + 1
										: scores[myGamepad.index];

								if (!player.selected) setReadyCheckCount(currentReadyCheckCount + 1);
								player.selected = true;
							} else {
								player.selected = false;
								setReadyCheckCount(currentReadyCheckCount - 1);
							}
						}
					}

					player.x = landingPage ? xAxisSum * 12 * multiplier : player.x;
				}
			});
			// score.value = currentScore;

			frame = requestAnimationFrame(update);
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<div class={`players`}>
	{#key players}
		{#each shapes as shape, i}
			{@const { active, pressing, selected, x, y } =
				players && players[i] && players[i].active ? players[i] : initialPlayerObject}
			{#if active}
				<Player {active} {pressing} {selected} {x} {y} {shape} {multiplier} />
			{/if}
		{/each}
	{/key}
</div>
