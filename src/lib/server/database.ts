import type { Shapes } from "$types";
import { shapes } from "$lib/players";
import { questions } from "$routes/trivia/questions.sever";

export const playerDB = new Map();
export const questionsDB = new Map();

export function initDBs() {
	playerDB.clear();
	for (const shape of shapes) {
		playerDB.set(shape, 0);
	}

	questionsDB.clear();
	for (let i = 0; i < questions.length; i++) {
		const question = questions[i];
		questionsDB.set(i, question);
	}
}

export function getQuestion(index: number) {
	return questionsDB.get(index);
}

export function getPlayerScore(playerName: Shapes) {
	return playerDB.get(playerName);
}

export function updatePlayerScore(playerName: Shapes, score: number) {
	playerDB.set(playerName, score);
}
