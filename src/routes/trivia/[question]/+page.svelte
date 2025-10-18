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
	const scoresContext = getContext<{
		scores: ScoresState;
		displayScores: ScoresState;
		updateDisplay: () => void;
	}>("scores");
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

	let activePlayers = $derived<number>(
		Object.keys(players).filter((playerKey) => {
			const player = players[Number(playerKey)];
			return player.active;
		}).length
	);
	let allAnswered = $derived<boolean>(readyPlayers === activePlayers);

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

	// Handle mouse click on answer options for mouse players
	const handleAnswerClick = (answerIndex: number) => {
		// Only handle clicks if we have mouse players
		const mouseIndex = 4; // Mouse player is always at index 4
		const mousePlayer = players[mouseIndex];
		if (!mousePlayer?.active || !mousePlayer.isMouse || mousePlayer.selected) return;

		if (mousePlayer) {
			const playerIndex = mouseIndex;

			// Update selection and position - move player to selected answer
			players[playerIndex].currentSelection = answerIndex;

			// Calculate position based on answer index (similar to gamepad movement)
			if (answerElements.length > 0) {
				const answerPositions = answerElements.map((elm) => {
					return elm.getBoundingClientRect().top - (wrapperElm?.getBoundingClientRect().top || 0);
				});
				const multiplier = 1 / 2; // Same multiplier as used in Players.svelte for quiz pages
				players[playerIndex].y = answerPositions[answerIndex] * multiplier;
				players[playerIndex].x = 0; // Keep x centered
			}

			// Update score (same logic as gamepad players)
			if (scoresContext.scores) {
				// Don't count tutorial/practice questions (check if we're on /trivia vs /trivia/[question])
				const isTutorial = !data.questionNumber && data.questionNumber !== 0; // Tutorial has no questionNumber
				const currentScore = scoresContext.scores[playerIndex] || 0;
				const isCorrect = answerIndex === data.question.correctAnswerIndex && !players[playerIndex].selected;
				const newScore = isTutorial ? currentScore : (isCorrect ? currentScore + 1 : currentScore);


				scoresContext.scores[playerIndex] = newScore;
				// Note: Don't save to localStorage immediately to avoid spoiling answers for other players
			}

			// Mark as selected and update ready count
			players[playerIndex].selected = true;
			const currentReady = getReadyCheckCount();
			setReadyCheckCount(currentReady + 1);
		}
	};

	const updateScore = () => {
		// Update display scores and save to localStorage
		scoresContext.updateDisplay();
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

	// Log question content when a new question loads
	$effect(() => {
		let cleanedText = data.question.text
			.replace(/<pre class='code'>/g, '')
			.replace(/<\/pre> returns:$/g, '')
			.replace(/<\/pre>$/g, '')
			.trim();
      const style = 'padding: 1rem; background-color: black; color: white; font-size: 1em;'
      console.log("%c"+cleanedText+ " returns: ", style, eval(cleanedText));
	});

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

<Score scores={scoresContext.displayScores} {players} />
<div class="question">
	<h1>{@html highlightedQuestionText}</h1>

	<span class="answers-wrapper">
		<Players pageName="trivia" {answerElements} {wrapperElm} question={data.question} />
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
						<span class={`back ${getClasses(i)}`}></span>
						<p class="text">{option}</p>
					</button>
				</li>
			{/each}
		</ul>
	</span>
</div>
<button class="nextBtn" disabled={!allAnswered} onclick={() => handleClick()}>{buttonText}</button>
