<script lang="ts">
	import { page } from "$app/state";
	const errorEmojis: { [key: number]: string } = {
		420: "🫠",
		500: "☠️",
		404: "🪦",
	};
</script>

<div class="errorPage">
	<h1>{page.status} - {page.error!.message}</h1>
	<span style="font-size: 6.5em">
		{errorEmojis[page.status] ?? errorEmojis[500]}
	</span>
</div>

<style>
	.errorPage {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	h1 {
		z-index: 2;
	}
</style>
