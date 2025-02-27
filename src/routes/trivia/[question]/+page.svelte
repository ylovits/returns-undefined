<script lang="ts">
	import "../trivia.less";
	import type { Shapes } from "$types";
	import Players from "$lib/Players.svelte";

	let { data } = $props();

	const handleClick = async (playerName: Shapes) => {
		await fetch(`/trivia/score`, {
			method: "PUT",
			body: JSON.stringify({ playerName }),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	let answerElements: HTMLLIElement[] = [];
	let wrapperElm = $state<HTMLSpanElement>();

</script>

<div class="question">
	<h1>{data.question.text}</h1>

	<span class="answers-wrapper"  >
		<Players pageName="trivia" {answerElements} {wrapperElm} />
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
