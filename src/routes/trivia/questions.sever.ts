import type { Question } from "$types";

export const readyCheck: Question = {
	text: "Let's see if you got the controls. \nAre you ready to start the quiz?",
	options: ["Yes", "No"],
	correctAnswerIndex: 0,
};

export const questions: Question[] = [
	{
		text: "What is the capital of France?",
		options: ["Paris", "London", "Berlin", "Madrid"],
		correctAnswerIndex: 0,
	},
	{
		text: "What is 2 + 2?",
		options: ["3", "4", "5", "6"],
		correctAnswerIndex: 1,
	},
];
