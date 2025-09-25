<script lang="ts">
	import { getContext, onMount } from "svelte";
	import { goto } from "$app/navigation";
	import Player from "$lib/Player.svelte";
	import type { PlayersState, ScoresState } from "$types";
	import useLocalStorage from "$lib/storage.svelte";
	import { shapes } from "$lib/players";
	import "../trivia.less";
	import "./results.less";
	import confetti from "canvas-confetti";

	const { players } = getContext<{ players: PlayersState }>("players");
	const scoresContext = getContext<{ scores: ScoresState }>("scores");
	const score = useLocalStorage("score");

	let { data } = $props();

	// Calculate results for each player
	type PlayerResult = {
		player: any;
		playerIndex: number;
		correctAnswers: number;
		incorrectAnswers: number;
		totalQuestions: number;
		percentage: number;
	};

	let sortedResults = $derived.by(() => {
		const playerResults = Object.keys(players).map((playerKey) => {
			const player = players[Number(playerKey)];
			const playerScore = score.value?.[Number(playerKey)] || 0;
			const correctAnswers = playerScore;
			const incorrectAnswers = data.totalQuestions - correctAnswers;

			return {
				player,
				playerIndex: Number(playerKey),
				correctAnswers,
				incorrectAnswers,
				totalQuestions: data.totalQuestions,
				percentage: Math.round((correctAnswers / data.totalQuestions) * 100),
			};
		});

		// Sort by score (highest first)
		return playerResults.sort((a, b) => b.correctAnswers - a.correctAnswers);
	});

	// Celebration confetti on mount
	onMount(() => {
		// Celebration confetti burst
		const duration = 2000;
		const end = Date.now() + duration;
		const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7", "#a29bfe"];

		function frame() {
			confetti({
				particleCount: 5,
				angle: 60,
				spread: 55,
				origin: { x: 0, y: 0.6 },
				colors: colors,
			});
			confetti({
				particleCount: 5,
				angle: 120,
				spread: 55,
				origin: { x: 1, y: 0.6 },
				colors: colors,
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		}
		frame();
	});

	const restartGame = () => {
		// Reset all scores
		Object.keys(players).forEach((playerKey) => {
			players[Number(playerKey)].x = 0;
			players[Number(playerKey)].y = 0;
			players[Number(playerKey)].lastMovement = Date.now();
			players[Number(playerKey)].currentSelection = 0;
			players[Number(playerKey)].selected = false;
		});

		// Clear scores
		const clearedScores: Record<number, number> = {};
		Object.keys(players).forEach((playerKey) => {
			clearedScores[Number(playerKey)] = 0;
		});

		scoresContext.scores = clearedScores;
		score.value = clearedScores;

		// Go back to landing page
		goto("/");
	};
</script>

<div id="results">
	<h1 class="title"><span class="trophy">🏆</span> <span> Results </span><span class="trophy">🏆</span></h1>

	<div class="results-grid">
		{#each sortedResults as result, index}
			<div class="player-result {index === 0 ? 'winner' : ''}">
				<div class="position">
					{#if index === 0}
						👑
					{:else}
						#{index + 1}
					{/if}
				</div>

				<div class="player-avatar">
					<Player
						active={true}
						pressing={false}
						selected={false}
						x={0}
						y={0}
						shape={shapes[result.playerIndex]}
						multiplier={1}
					/>
				</div>

				<div class="stats">
					<div class="score-display">
						<span class="correct">✅ {result.correctAnswers}</span>
						<span class="incorrect">❌ {result.incorrectAnswers}</span>
					</div>
					<div class="score-points">{result.correctAnswers} correct</div>
					<div class="total">out of {result.totalQuestions} questions</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="actions">
        <button class="restartBtn" onclick={() => restartGame()}>
            <div class="background"></div>
			<span>Play Again</span>
		</button>
	</div>
</div>
