import type { shapes } from "./constants";

export type Player = {
	name: string;
	active: boolean;
	pressing: boolean;
	gamepad: Gamepad | null;
	x: number;
	y: number;
};

export type Shapes = typeof shapes[number];

export type PayersState = {[key:Shapes]: Player};
