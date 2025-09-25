<script lang="ts">
	import Players from "$lib/Players.svelte";
	import Score from "$lib/Score.svelte";
	import { goto } from "$app/navigation";
	import { getContext } from "svelte";
	import "../trivia.less";
	import type { PlayersState, ScoresState } from "$types";
	import useLocalStorage from "$lib/storage.svelte";

	const { players } = getContext<{ players: PlayersState }>("players");
	const scoresContext = getContext<{ scores: ScoresState }>("scores");
	const score = useLocalStorage("score");

	const { getReadyCheckCount, setReadyCheckCount } = getContext<{
		setReadyCheckCount: (count: number) => void;
		getReadyCheckCount: () => number;
	}>("readyCheck");

	let { data } = $props();
	let readyPlayers = $derived<number>(getReadyCheckCount());

	let answerElements = $state<HTMLLIElement[]>([]);
	let wrapperElm = $state<HTMLSpanElement>();

	let allAnswered = $derived<boolean>(readyPlayers === Object.keys(players).length);

	let buttonText = $derived<string>(!allAnswered ? "Waiting..." : "Next Question");

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
		goto("/trivia/" + data.nextPage);
	};
</script>

<Score scores={score.value} {players} />
<div class="question">
	<h1>{@html data.question.text}</h1>

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
