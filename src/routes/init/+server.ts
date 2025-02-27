import { initDBs } from "$lib/server/database";

export async function PUT() {
	initDBs();
	return new Response(null, { status: 200 });
}