import { questions } from "../questions.sever";
import { error } from "@sveltejs/kit";

export function load({ params }) {
	const question = questions[Number(params.question)];
	if (!question) error(404);

	return {
		question,
		nextPage: Number(params.question) + 1
	};
}
