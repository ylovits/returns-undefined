import { initDB } from "$lib/server/database";

export async function PUT() {
	initDB();
	return new Response(null, { status: 200 });
}
