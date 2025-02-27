<script lang="ts">
	import Players from "$lib/Players.svelte";
	import "./trivia.less";
	let { data } = $props();

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
<a class="nextBtn" href="/trivia/1" data-sveltekit-preload-data>Continue</a>
