<script lang="ts">
	import Players from "$lib/Players.svelte";
	import Score from "$lib/Score.svelte";
	import { goto } from "$app/navigation";
	import { getContext, onMount } from "svelte";
	import "../trivia.less";
	import type { PlayersState, ScoresState, GameState } from "$types";
	import useLocalStorage from "$lib/storage.svelte";
	import { processQuestionText } from "$lib/syntax-highlighting";
	import confetti from "canvas-confetti";

	const { players } = getContext<{ players: PlayersState }>("players");
	const scoresContext = getContext<{ scores: ScoresState }>("scores");
	const score = useLocalStorage("score");

	const { getReadyCheckCount, setReadyCheckCount } = getContext<{
		setReadyCheckCount: (count: number) => void;
		getReadyCheckCount: () => number;
	}>("readyCheck");

	const gameStateContext = getContext<{
		gameState: GameState;
		getGameState: () => GameState;
		startTimer: () => void;
		stopTimer: () => void;
		endGame: () => void;
		updateGameState: (updates: Partial<GameState>) => void;
	}>("gameState");

	// Use the getter function for reactive access
	const gameState = $derived(gameStateContext.getGameState());
	const { startTimer, updateGameState } = gameStateContext;

	let { data } = $props();
	let readyPlayers = $derived<number>(getReadyCheckCount());

	let answerElements = $state<HTMLLIElement[]>([]);
	let wrapperElm = $state<HTMLSpanElement>();

	let allAnswered = $derived<boolean>(readyPlayers === Object.keys(players).length);

	let buttonText = $derived<string>(
		!allAnswered ? "Waiting..." : data.isLastQuestion ? "Show Results" : "Next Question"
	);

	let highlightedQuestionText = $derived<string>(processQuestionText(data.question.text));

	// Track if confetti has been shown for this question
	let confettiShown = $state<boolean>(false);

	// Check if any player has selected an answer on the last question
	let anyPlayerSelected = $derived<boolean>(
		Object.keys(players).some((playerKey) => players[Number(playerKey)].selected)
	);

	// Trigger confetti when players have selected answers AND all players are done with the last question
	$effect(() => {
		if (data.isLastQuestion && anyPlayerSelected && allAnswered && !confettiShown) {
			confettiShown = true;

			// Multiple bursts of confetti for a "tada" effect
			const duration = 3000;
			const end = Date.now() + duration;

			const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7", "#a29bfe"];

			function frame() {
				confetti({
					particleCount: 2,
					angle: 60,
					spread: 55,
					origin: { x: 0 },
					colors: colors,
				});
				confetti({
					particleCount: 2,
					angle: 120,
					spread: 55,
					origin: { x: 1 },
					colors: colors,
				});

				if (Date.now() < end) {
					requestAnimationFrame(frame);
				}
			}
			frame();
		}
	});

	const getClasses = (i: number) => {
		const correct = readyPlayers > 0 && allAnswered && data.question.correctAnswerIndex === i;
		const selected = Object.keys(players).some((playerKey) => players[Number(playerKey)].currentSelection === i);
		const answered = Object.keys(players).some(
			(playerKey) => players[Number(playerKey)].currentSelection === i && players[Number(playerKey)].selected
		);
		let classes = `${correct ? "correct" : ""} ${selected ? "selected" : ""} ${answered ? "answered" : ""}`;
		return classes;
	};

	const resetPlayerAnswers = () => {
		Object.keys(players).forEach((playerKey) => {
			players[Number(playerKey)].x = 0;
			players[Number(playerKey)].y = 0;
			players[Number(playerKey)].lastMovement = Date.now();
			players[Number(playerKey)].currentSelection = 0;
			players[Number(playerKey)].selected = false;
			setReadyCheckCount(0);
		});
	};

	const updateScore = () => {
		score.value = scoresContext.scores;
	};

	const handleClick = () => {
		updateScore();
		resetPlayerAnswers();

		updateGameState({ questionsAnswered: gameState.questionsAnswered + 1 });

		if (data.isLastQuestion || gameState.gameEnded) {
			goto("/trivia/results");
		} else {
			goto("/trivia/" + data.nextPage);
		}
	};

	onMount(() => {
		// Start timer on first question (question 0)
		if (data.questionNumber === 0 && gameState.timerEnabled && gameState.timeRemaining > 0) {
			startTimer();
		}

		// Redirect to results if game has already ended
		if (gameState.gameEnded) {
			goto("/trivia/results");
		}
	});
</script>

<Score scores={score.value} {players} />
<div class="question">
	<h1>{@html highlightedQuestionText}</h1>

	<span class="answers-wrapper">
		<Players pageName="trivia" {answerElements} {wrapperElm} question={data.question} />
		<ul class="answers" bind:this={wrapperElm}>
			{#each data.question.options as option, i}
				<li id={`answer-${i + 1}`} bind:this={answerElements[i]}>
					<span class={`back ${getClasses(i)}`}></span>
					<p class="text">{option}</p>
				</li>
			{/each}
		</ul>
	</span>
</div>
<button class="nextBtn" disabled={!allAnswered} onclick={() => handleClick()}>{buttonText}</button>
