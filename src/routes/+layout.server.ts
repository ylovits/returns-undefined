import { base } from "$app/paths";

export const load = ({ url, params }) => {
	let pageName = "landing";
	if (url.pathname && url.pathname.length > 0) {
		// Remove base path from URL pathname before parsing
		let pathname = url.pathname;
		if (base && pathname.startsWith(base)) {
			pathname = pathname.slice(base.length);
		}

		const parts = pathname.split("/");
		if (parts.length > 0) {
			pageName = parts[1] || "landing";
		}
	}

	return {
		pageName,
		question: params.question,
	};
};
