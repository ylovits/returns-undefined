<script lang="ts">
	import type { ScoresState, Shapes } from "$types";
	import { shapes, shapeSVGs } from "./players";
	import { getContext } from "svelte";
	const scoresContext = getContext<{ scores: ScoresState }>("scores");
</script>

<div class="score players">
	{#each shapes as shape, i}
		<span class="wrapper">
			<svg viewBox="0 0 377 377" class="{shape} player">
				<g>
					{@html shapeSVGs[shape as Shapes]}
				</g>
			</svg>
			<span class="points"> {scoresContext.scores[i]} </span>
		</span>
	{/each}
</div>
