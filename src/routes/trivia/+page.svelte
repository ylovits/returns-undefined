<script lang="ts">
	import Players from "$lib/Players.svelte";
	import type { PlayersState, ScoresState } from "$types";
	import { getContext } from "svelte";
	import { goto } from "$app/navigation";
	import useLocalStorage from "$lib/storage.svelte";
	import { processQuestionText } from "$lib/syntax-highlighting";

	import "./trivia.less";

	const { players } = getContext<{ players: PlayersState }>("players");
	const scoresContext = getContext<{ scores: ScoresState }>("scores");
	const score = useLocalStorage("score");
	const { setReadyCheckCount, getReadyCheckCount } = getContext<{
		setReadyCheckCount: (count: number) => void;
		getReadyCheckCount: () => number;
	}>("readyCheck");

	let { data } = $props();
	let readyPlayers = $derived<number>(getReadyCheckCount());

	let answerElements = $state<HTMLLIElement[]>([]);
	let wrapperElm = $state<HTMLSpanElement>();
	let activePlayers = $derived<number>(
		Object.keys(players).filter((playerKey) => {
			const player = players[Number(playerKey)];
			return player.active;
		}).length
	);
	let allAnswered = $derived<boolean>(readyPlayers === activePlayers);
	let allCorrect = $derived<boolean>(
		Object.keys(players).every((playerKey) => {
			const player = players[Number(playerKey)];
			return !player.active || player.currentSelection === data.question.correctAnswerIndex;
		})
	);

	let buttonText = $derived<string>(!allAnswered ? "Waiting..." : allCorrect ? "Start Game" : "Try Again");

	let highlightedQuestionText = $derived<string>(processQuestionText(data.question.text));

	const resetStage = () => {
		let currentScore = score.value || {};

		Object.keys(players).forEach((playerKey) => {
			players[Number(playerKey)].x = 0;
			players[Number(playerKey)].y = 0;
			players[Number(playerKey)].lastMovement = Date.now();
			players[Number(playerKey)].currentSelection = 0;
			players[Number(playerKey)].selected = false;
			setReadyCheckCount(0);
			currentScore[Number(playerKey)] = 0;
		});
		scoresContext.scores = currentScore;
		score.value = currentScore;
	};

	// Handle mouse click on answer options for mouse players
	const handleAnswerClick = (answerIndex: number) => {
		// Only handle clicks if we have mouse players
		const mouseIndex = 4; // Mouse player is always at index 4
		const mousePlayer = players[mouseIndex];
		if (!mousePlayer?.active || !mousePlayer.isMouse || mousePlayer.selected) return;

		if (mousePlayer) {
			const playerIndex = mouseIndex;
			players[playerIndex].currentSelection = answerIndex;
			players[playerIndex].selected = true;

			// Calculate position based on answer index (similar to gamepad movement)
			if (answerElements.length > 0) {
				const answerPositions = answerElements.map((elm) => {
					return elm.getBoundingClientRect().top - (wrapperElm?.getBoundingClientRect().top || 0);
				});
				const multiplier = 1 / 2; // Same multiplier as used in Players.svelte for quiz pages
				players[playerIndex].y = answerPositions[answerIndex] * multiplier;
				players[playerIndex].x = 0; // Keep x centered
			}

			// Update ready count
			const currentReady = getReadyCheckCount();
			setReadyCheckCount(currentReady + 1);
		}
	};

	const handleClick = () => {
		if (allAnswered && allCorrect) {
			resetStage();
			goto("/trivia/0");
		} else {
			resetStage();
		}
	};
</script>

<div class="question">
	<h1>{@html highlightedQuestionText}</h1>
	<span class="answers-wrapper">
		<Players pageName="trivia" {answerElements} {wrapperElm} question={data.question} />
		<!-- <ul class="answers" bind:this={wrapperElm}>
			{#each data.question.options as option, i}
				<li id={`answer-${i + 1}`} bind:this={answerElements[i]}>
					<span class="back"></span>
					<p class="text">{option}</p>
				</li>
			{/each}
		</ul> -->
		<ul class="answers" bind:this={wrapperElm}>
			{#each data.question.options as option, i}
				<li
					id={`answer-${i + 1}`}
					bind:this={answerElements[i]}
					class="answer-option"
				>
					<button
						class="answer-button"
						onclick={() => handleAnswerClick(i)}
						type="button"
					>
						<span class="back"></span>
						<p class="text">{option}</p>
					</button>
				</li>
			{/each}
		</ul>

	</span>
</div>
<button class="nextBtn" disabled={!allAnswered} onclick={() => handleClick()}>{buttonText}</button>
