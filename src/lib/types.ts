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
};

export type Shapes = (typeof shapes)[number];

export type PayersState = { [key: Shapes]: Player };

export type Question = {
	text: string;
	options: string[];
	correctAnswerIndex: number;
};
