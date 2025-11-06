<script lang="ts">
	import Players from "$lib/Players.svelte";
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import type { PlayersState, GameState } from "$types";
	import { getContext, onMount } from "svelte";
	import useLocalStorage from "$lib/storage.svelte";
	import QRCode from "qrcode";

	const playersContext = getContext<{ players: PlayersState; toggleMousePlayer: () => void }>("players");
	const gameStateContext = getContext<{
		gameState: GameState;
		updateGameState: (updates: Partial<GameState>) => void;
	}>("gameState");
	const gameStateStorage = useLocalStorage("gameState");
	const score = useLocalStorage("score");

	let timerEnabled = $state(false);
	let timerMinutes = $state(15);
	let showQRModal = $state(false);
	let qrCodeDataUrl = $state("");

	let allActive = $derived(
		Object.keys(playersContext.players).some((playerKey) => {
			const player = playersContext.players[Number(playerKey)];
			return player.active;
		})
	);

	let isTimerValid = $derived(
		!timerEnabled || (timerMinutes > 0 && timerMinutes <= 60)
	);

	let hasControllers = $derived(
		Object.keys(playersContext.players).some((playerKey) => {
			const player = playersContext.players[Number(playerKey)];
			return player.active && !player.isMouse;
		})
	);

	let hasMousePlayer = $derived(
		Object.keys(playersContext.players).some((playerKey) => {
			const player = playersContext.players[Number(playerKey)];
			return player.active && player.isMouse;
		})
	);

	let canContinue = $derived((allActive || hasMousePlayer) && isTimerValid);

	let subtitleMessage = $derived(
		hasControllers ? "Test your controllers and click continue when you are ready" :
		hasMousePlayer ? "Single player ready - click continue when you are ready" :
		"Or connect controllers to continue"
	);

	onMount(() => {
		score.value = null;

		gameStateStorage.value = {
			timerEnabled: false,
			timerMinutes: 15,
			timeRemaining: 0,
			questionsAnswered: 0,
			gameEnded: false
		};
	});

	const handleStartGame = () => {
		try {
			const newState = {
				timerEnabled,
				timerMinutes,
				timeRemaining: timerEnabled ? timerMinutes * 60 : 0,
				questionsAnswered: 0,
				gameEnded: false
			};

			// Use the context function instead of direct storage assignment
			if (gameStateContext) {
				gameStateContext.updateGameState(newState);
			} else {
				// Fallback to direct storage
				gameStateStorage.value = newState;
			}

			goto("/trivia");
		} catch (error) {
			console.error("Error in handleStartGame:", error);
		}
	};

	const handleShowQR = async () => {
		try {
			const url = "https://ylovits.github.io/returns-undefined";
			const dataUrl = await QRCode.toDataURL(url, {
				width: 256,
				margin: 2,
				color: {
					dark: '#000000',
					light: '#FFFFFF'
				}
			});
			qrCodeDataUrl = dataUrl;
			showQRModal = true;
		} catch (error) {
			console.error("Error generating QR code:", error);
		}
	};

	const closeQRModal = () => {
		showQRModal = false;
	};
</script>

<div class="title">
	<img src="{base}/js.svg" alt="JS LOGO" />
	<h1>Returns Undefined</h1>
</div>

<Players pageName="landing" />

{#if !hasControllers && !hasMousePlayer}
	<div class="add-mouse-player">
		<button class="add-mouse-btn" onclick={playersContext.toggleMousePlayer}>
			<span class="add-text">Play with a mouse (single player)</span>
		</button>
	</div>
{:else if hasMousePlayer && !hasControllers}
	<div class="mouse-player-status">
		<span class="mouse-status">🖱️ single player active</span>
		<button class="remove-mouse-btn" onclick={playersContext.toggleMousePlayer}>
			Remove
		</button>
	</div>
{/if}

<h3 class="subtitle">{subtitleMessage}</h3>
<div class="timer-settings">
    <div class="timer-settings-background"></div>
	<label class="timer-checkbox">
		<input type="checkbox" bind:checked={timerEnabled} />
		<span class="checkmark"></span>
		Set a time limit
	</label>

	{#if timerEnabled}
		<div class="timer-input-group">
			<label for="timer-minutes">Minutes:</label>
			<input
				id="timer-minutes"
				type="number"
				bind:value={timerMinutes}
				min="1"
				max="60"
				class="timer-input"
			/>
		</div>
	{/if}
</div>

	<button class="qr-btn" onclick={handleShowQR}>⛶</button>
<button class="nextBtn" disabled={!canContinue} onclick={handleStartGame}>Continue</button>

{#if showQRModal}
	<div
		class="qr-modal-overlay"
		role="button"
		tabindex="0"
		aria-label="Close QR modal"
		onclick={closeQRModal}
		onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeQRModal(); }}
	>
		<div
			class="qr-modal"
			role="dialog"
			aria-modal="true"
		>
			<button
				class="qr-close"
				onclick={closeQRModal}
				onkeydown={(e) => { if (e.key === 'Escape') closeQRModal(); }}
			>×</button>
			<h2>Scan to Play</h2>
			<div class="qr-code">
				{#if qrCodeDataUrl}
					<img src={qrCodeDataUrl} alt="QR Code for Returns Undefined game" />
				{/if}
			</div>
			<p class="qr-url">https://ylovits.github.io/returns-undefined</p>
		</div>
	</div>
{/if}
