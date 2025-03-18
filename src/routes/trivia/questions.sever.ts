import type { Question } from "$types";

export const readyCheck: Question = {
	text: "Let's see if you got the controls. \nAre you ready to start the quiz?",
	options: ["Yes", "No"],
	correctAnswerIndex: 0,
};

export const questions: Question[] = [
	{
		text: "<pre class='code'>true</pre> returns:",
		options: ["true", "false", "undefined", "null"],
		correctAnswerIndex: 0,
	},
	{
		text: `<pre class='code'>!true</pre> returns:`,
		options: ["true", "false", "undefined", "null"],
		correctAnswerIndex: 1,
	},
	{
		text: "<pre class='code'>!!true</pre> returns:",
		options: ["true", "false", "undefined", "null"],
		correctAnswerIndex: 0,
	},
	{
		text: "<pre class='code'>!![]</pre> returns:",
		options: ["'object'", "'[object Object]'", "false", "true"],
		correctAnswerIndex: 3,
	},
];
