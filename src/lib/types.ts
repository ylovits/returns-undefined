import type { shapes } from "./players";

export type Player = {
	name: string;
	active: boolean;
	pressing: boolean;
	gamepad: Gamepad | null;
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
