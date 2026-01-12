import { questions } from "../questions.sever.js";
import type { PageLoad } from "./$types";

export const prerender = true;

// Generate entries for all possible question routes
export async function entries() {
	return questions.map((_, index) => ({
		question: index.toString(),
	}));
}

export const load: PageLoad = async ({ data }) => {
	// Pass through server data
	return data;
};
