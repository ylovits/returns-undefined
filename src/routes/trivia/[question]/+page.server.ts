import { questions } from "../questions.sever";
import { error } from "@sveltejs/kit";

export function load({ params }) {
	const questionIndex = Number(params.question);
	const question = questions[questionIndex];
	if (!question) error(404);

	const isLastQuestion = questionIndex === questions.length - 1;

	return {
		question,
		questionNumber: questionIndex,
		nextPage: Number(params.question) + 1,
		isLastQuestion,
		totalQuestions: questions.length,
	};
}
