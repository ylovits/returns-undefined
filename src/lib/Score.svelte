<script lang="ts">
	import type { Shapes } from "$types";
	import { initialPlayerObject, shapes, shapeSVGs } from "./players";
	let { scores, players } = $props();
</script>

<div class="score players">
	{#each shapes as shape, i}
		{@const { active } = players && players[i] && players[i].active ? players[i] : initialPlayerObject}
		{#if active}
			<span class="wrapper">
				<svg viewBox="0 0 377 377" class="{shape} player">
					<g>
						{@html shapeSVGs[shape as Shapes]}
					</g>
				</svg>
				<span class="points"> {scores ? scores[i] : "0"} </span>
			</span>
		{/if}
	{/each}
</div>
