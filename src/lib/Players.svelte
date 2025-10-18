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
	let scoredPlayers = $state<Set<number>>(new Set()); // Track which players have been scored this question

	const playersContext = getContext<{ players: PlayersState }>("players");
	const scoresContext = getContext<{
		scores: ScoresState;
		displayScores: ScoresState;
		updateDisplay: () => void;
	}>("scores");
	const { setReadyCheckCount, getReadyCheckCount } = getContext<{
		setReadyCheckCount: (count: number) => void;
		getReadyCheckCount: () => number;
	}>("readyCheck");

	let props = $props();

	const multiplier = props.pageName === "landing" ? 5 : 1 / 2;

	// Reset scored players when question changes
	$effect(() => {
		if (props.question) {
			scoredPlayers.clear();
		}
	});

	onMount(() => {
		if (!scoresContext.scores) {
			scoresContext.scores = score.value;
		}

		let frame = requestAnimationFrame(function update() {
			const contextPlayers = playersContext.players || {};
			// let currentScore = score.value || {};
			scores = scoresContext.scores || {};

			// Calculate actual ready count from player states to prevent race conditions
			const actualReadyCount = Object.keys(contextPlayers).reduce((count, playerKey) => {
				const player = contextPlayers[Number(playerKey)];
				return count + (player.active && player.selected ? 1 : 0);
			}, 0);

			// Sync the ready count if it's out of sync
			const storedReadyCount = getReadyCheckCount();
			if (actualReadyCount !== storedReadyCount) {
				console.log(`Syncing ready count: stored=${storedReadyCount}, actual=${actualReadyCount}`);
				setReadyCheckCount(actualReadyCount);
			}

			Object.keys(contextPlayers).forEach((playerKey) => {
				const playerIndex = Number(playerKey);
				const player = contextPlayers[playerIndex];

				// Safety check - skip if player doesn't exist or isn't active
				if (!player || !player.active) return;

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
					const gamepadPlayer = contextPlayers[myGamepad.index];
					if (!gamepadPlayer || !gamepadPlayer.active) return;

					const landingPage = props.pageName === "landing";
					const { pressing, yAxisSum, xAxisSum } = mainControls(myGamepad);

					if (landingPage) {
						gamepadPlayer.y = gamepadPlayer.selected ? gamepadPlayer.y : yAxisSum * 60;
						if (pressing) {
							myGamepad.vibrationActuator.playEffect("trigger-rumble", {
								startDelay: 0,
								duration: 5,
								weakMagnitude: 1,
								strongMagnitude: 1,
							});
							gamepadPlayer.x += Math.floor(Math.random() * 21 * multiplier) - 11 * multiplier;
							gamepadPlayer.y += Math.floor(Math.random() * 21 * multiplier) - 10 * multiplier;
						}
					} else {
						if (!answerPositions.length && props.answerElements) {
							answerPositions = props.answerElements.map((elm: HTMLElement) => {
								return elm.getBoundingClientRect().top - props.wrapperElm.getBoundingClientRect().top;
							});
						}
						const { moveDown, moveUp, select } = inQuizControls(myGamepad);
						const now = Date.now();
						const timeSinceLastMove = now - gamepadPlayer.lastMovement;

						if (answerPositions && !gamepadPlayer.selected) {
							if ((moveDown || moveUp) && timeSinceLastMove > 200) {
								changeSelection(moveDown ? "down" : "up", gamepadPlayer, answerPositions.length);
								gamepadPlayer.lastMovement = Date.now();
								gamepadPlayer.y = answerPositions[gamepadPlayer.currentSelection] * multiplier;
							} else {
								gamepadPlayer.y = answerPositions[gamepadPlayer.currentSelection] * multiplier;
							}
						} else {
							gamepadPlayer.y = gamepadPlayer.selected ? gamepadPlayer.y : yAxisSum * 60;
						}

						if (select && timeSinceLastMove > 200) {
							gamepadPlayer.lastMovement = Date.now();
							if (!!gamepadPlayer.currentSelection || gamepadPlayer.currentSelection == 0) {
								// Only update score if not already scored this question (prevent multiple scoring)
								if (!scoredPlayers.has(myGamepad.index)) {
									// Don't count tutorial/practice questions (base /trivia page vs /trivia/[question])
									const isTutorial = props.pageName === "trivia" && !window.location.pathname.match(/\/trivia\/\d+/);
									const currentScore = scoresContext.scores[myGamepad.index] || 0;
									const isCorrect = gamepadPlayer.currentSelection === props.question.correctAnswerIndex;
									const newScore = isTutorial ? currentScore : (isCorrect ? currentScore + 1 : currentScore);

									// Add vibration feedback (only in real game, not tutorial)
									if (!isTutorial && myGamepad.vibrationActuator) {
										if (!isCorrect) {
											// Single longer vibration for incorrect answer
											myGamepad.vibrationActuator.playEffect("dual-rumble", {
												startDelay: 0,
												duration: 400,
												weakMagnitude: 0.1,
												strongMagnitude: 0.2,
											});
										} else {
											// Two quick vibrations for correct answer
											myGamepad.vibrationActuator.playEffect("dual-rumble", {
												startDelay: 0,
												duration: 100,
												weakMagnitude: 0.1,
												strongMagnitude: 0.2,
											});
											// Second vibration after a brief pause
											setTimeout(() => {
												if (myGamepad.vibrationActuator) {
													myGamepad.vibrationActuator.playEffect("dual-rumble", {
														startDelay: 0,
														duration: 100,
														weakMagnitude: 0.1,
														strongMagnitude: 0.2,
													});
												}
											}, 350);
										}
									}

									scoresContext.scores[myGamepad.index] = newScore;
									scoredPlayers.add(myGamepad.index); // Mark this player as scored
									// Note: Don't save to localStorage immediately to avoid spoiling answers for other players

									const liveReadyCount = getReadyCheckCount();
									setReadyCheckCount(liveReadyCount + 1);
								}
								gamepadPlayer.selected = true;
							} else {
								gamepadPlayer.selected = false;
								const liveReadyCount = getReadyCheckCount();
								setReadyCheckCount(liveReadyCount - 1);
							}
						}
					}

					gamepadPlayer.x = landingPage ? xAxisSum * 12 * multiplier : gamepadPlayer.x;
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
	{#key playersContext.players}
		{#each shapes as shape, i}
			{@const { active, pressing, selected, x, y } =
				playersContext.players && playersContext.players[i] && playersContext.players[i].active ? playersContext.players[i] : initialPlayerObject}
			{#if active}
				<Player {active} {pressing} {selected} {x} {y} {shape} {multiplier} />
			{/if}
		{/each}
	{/key}
</div>
