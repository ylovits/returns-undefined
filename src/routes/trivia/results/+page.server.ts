import { questions } from "../questions.sever";

export function load() {
	return {
		totalQuestions: questions.length,
	};
}
