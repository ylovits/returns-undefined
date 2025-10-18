import type { shapes } from "./players";

export type Player = {
	name: string;
	active: boolean;
	pressing: boolean;
	gamepad: Gamepad | null;
	isMouse: boolean; // True if this is a mouse-controlled player
	manuallyAdded?: boolean; // True if this mouse player was manually added via + button
	x: number;
	y: number;
	lastMovement: number;
	currentSelection: number;
	selected: boolean;
};

export type Shapes = (typeof shapes)[number];

export type PlayersState = { [key: number]: Player };
export type ScoresState = { [key: number]: number };

export type Question = {
	text: string;
	options: string[];
	correctAnswerIndex: number;
};

export type GameState = {
	timerEnabled: boolean;
	timerMinutes: number;
	timeRemaining: number;
	questionsAnswered: number;
	gameEnded: boolean;
};
