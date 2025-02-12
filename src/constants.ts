import type { Shapes } from "./types";

export const initialPlayerObject = {
	name: "",
	active: false,
	gamepad: null,
	pressing: false,
	x: 0,
	y: 0,
};

export const shapes = ["triangle", "circle", "hexagon", "square"];

export const shapeSVGs: { [key in Shapes]: string } =  {
	triangle: '<polygon points="188.5,53.5 32.62,323.5 344.38,323.5 " />',
	circle: '<circle cx="188.5" cy="188.5" r="135" />',
	hexagon: '<polygon points="266.44,53.5 110.56,53.5 32.62,188.5 110.56,323.5 266.44,323.5 344.38,188.5 " />',
	square: '<rect x="53.5" y="53.5" width="270" height="270" />',
};
