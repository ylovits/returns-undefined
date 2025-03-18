<script lang="ts">
	import type { Shapes } from "$types";
	import { shapeSVGs } from "./players";
	const { active, pressing, selected, x, y, shape, multiplier } = $props();
</script>

<svg
	class="{shape} player {active ? 'active' : ''} {pressing ? 'pressing' : ''} {selected ? 'selected' : ''}"
	viewBox="0 0 377 377"
	style={`overflow: visible; ${x ? "transform: rotate(" + (x / Math.abs(x)) * multiplier + "deg)" + " translate(" + x * 2 + "px, " + y * 2 + "px)" : "transform: translate(" + x * 2 + "px, " + y * 2 + "px)"}`}
>
	<g>
		{@html shapeSVGs[shape as Shapes]}
	</g>
</svg>
