<script lang="ts">
	import { goto } from "$app/navigation";

	const handleRestart = () => {
		// Clear localStorage to reset game state
		localStorage.removeItem("score");
		localStorage.removeItem("gameState");

		// Navigate back to home page
		goto("/");
	};
</script>

<button class="restart-button" on:click={handleRestart} title="Restart Game">
	<img src="/js.svg" alt="JavaScript Logo - Restart Game" />
</button>

<style lang="less">
	.restart-button {
		position: fixed;
		bottom: 20px;
		left: 20px;
		z-index: 1000;
		background: transparent;
		border: none;
		cursor: pointer;
		filter: url(#pixelate-xs);

		img {
			width: 32px;
			height: 32px;
			display: block;
		}
	}
</style>