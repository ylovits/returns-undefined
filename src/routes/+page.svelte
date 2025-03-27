<script lang="ts">
	import Players from "$lib/Players.svelte";
	import { goto } from "$app/navigation";
	import type { PlayersState } from "$types";
	import { getContext } from "svelte";

	const playersContext = getContext<{ players: PlayersState }>("players");

	let allActive = $derived(
		Object.keys(playersContext.players).every((playerKey) => {
			const player = playersContext.players[Number(playerKey)];
			return player.active;
		})
	);
</script>

<div class="title">
	<img src="./js.svg" alt="JS LOGO" />
	<h1>Returns Undefined</h1>
</div>
<Players pageName="landing" />
<button class="nextBtn" disabled={!allActive} onclick={() => goto("/trivia")}>Continue</button>
