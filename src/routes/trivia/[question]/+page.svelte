<script lang="ts">
	import Players from "$lib/Players.svelte";
	import Score from "$lib/Score.svelte";
	import { getContext } from "svelte";
	import "../trivia.less";
	import type { PlayersState } from "$types";

	let players = $state<PlayersState>({});
	let { data } = $props();

	let answerElements: HTMLLIElement[] = [];
	let wrapperElm = $state<HTMLSpanElement>();
</script>

<Score />
<div class="question">
	<h1>{@html data.question.text}</h1>

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
<a class="nextBtn" href={"/trivia/" + data.nextPage} data-sveltekit-preload-data>Continue</a>
