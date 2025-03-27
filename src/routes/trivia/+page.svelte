<script lang="ts">
	import Players from "$lib/Players.svelte";
	import type { PlayersState, ScoresState } from "$types";
	import { getContext } from "svelte";
	import { goto } from "$app/navigation";
	import "./trivia.less";

	const { players } = getContext<{ players: PlayersState }>("players");
	const { scores } = getContext<{ scores: ScoresState }>("scores");
	const { setReadyCheckCount, getReadyCheckCount } = getContext<{
		setReadyCheckCount: (count: number) => void;
		getReadyCheckCount: () => number;
	}>("readyCheck");

	let { data } = $props();
	let readyPlayers = $derived<number>(getReadyCheckCount());

	let answerElements: HTMLLIElement[] = [];
	let wrapperElm = $state<HTMLSpanElement>();
	let allAnswered = $derived<boolean>(readyPlayers === Object.keys(players).length);
	let allCorrect = $derived<boolean>(
		Object.keys(players).every((playerKey) => {
			const player = players[Number(playerKey)];
			return player.currentSelection === data.question.correctAnswerIndex;
		})
	);

	let buttonText = $derived<string>(!allAnswered ? "Waiting..." : allCorrect ? "Start Game" : "Try Again");

	const resetStage = () => {
		Object.keys(players).forEach((playerKey) => {
			players[Number(playerKey)].x = 0;
			players[Number(playerKey)].y = 0;
			players[Number(playerKey)].lastMovement = Date.now();
			players[Number(playerKey)].currentSelection = 0;
			players[Number(playerKey)].selected = false;
			setReadyCheckCount(0);
			scores[Number(playerKey)] = 0;
		});
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
	<h1>{data.question.text}</h1>
	<span class="answers-wrapper">
		<Players pageName="trivia" {answerElements} {wrapperElm} question={data.question} />
		<ul class="answers" bind:this={wrapperElm}>
			{#each data.question.options as option, i}
				<li id={`answer-${i + 1}`} bind:this={answerElements[i]}>
					<span class="back"></span>
					<p class="text">{option}</p>
				</li>
			{/each}
		</ul>
	</span>
</div>
<button class="nextBtn" disabled={!allAnswered} onclick={() => handleClick()}>{buttonText}</button>
