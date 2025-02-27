export const load = ({ url, params }) => {
	let pageName = "landing";
	if (url.pathname && url.pathname.length > 0) {
		const parts = url.pathname.split("/");
		if (parts.length > 0) {
			pageName = parts[1] || "landing";
		}
	}

	return {
		pageName,
		question: params.question,
	};
};
