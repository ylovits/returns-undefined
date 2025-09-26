<script lang="ts">
	import { getContext } from "svelte";
	import type { GameState } from "$types";

	const gameStateContext = getContext<{
		gameState: GameState;
		getGameState: () => GameState;
		startTimer: () => void;
		stopTimer: () => void;
		endGame: () => void;
		updateGameState: (updates: Partial<GameState>) => void;
	}>("gameState");

	// Use the getter function for reactive access
	const gameState = $derived(gameStateContext.getGameState());

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

</script>

{#if gameState.timerEnabled && gameState.timeRemaining >= 0}
	<div class="timer-display" class:warning={gameState.timeRemaining <= 30} class:danger={gameState.timeRemaining <= 10}>
		<div class="timer-icon">⏱️</div>
		<div class="timer-text">{formatTime(gameState.timeRemaining)}</div>
	</div>
{/if}

<style lang="less">
	.timer-display {
		position: fixed;
		top: 20px;
		left: 20px;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 10px 15px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: monospace;
		font-size: 18px;
		font-weight: bold;
		z-index: 1000;
		border: 2px solid #4a90e2;
		box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
		transition: all 0.3s ease;

		&.warning {
			border-color: #f39c12;
			box-shadow: 0 4px 12px rgba(243, 156, 18, 0.4);
			animation: pulse 2s infinite;
		}

		&.danger {
			border-color: #e74c3c;
			box-shadow: 0 4px 12px rgba(231, 76, 60, 0.5);
			animation: urgent-pulse 1s infinite;
		}

		.timer-icon {
			font-size: 20px;
		}

		.timer-text {
			font-size: 20px;
			letter-spacing: 1px;
		}
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	@keyframes urgent-pulse {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.8;
			transform: scale(1.05);
		}
	}
</style>