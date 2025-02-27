import { json } from "@sveltejs/kit";
import * as db from "$lib/server/database.js";

export async function GET({ request }) {
	const { playerName } = await request.json();
	const score = db.getPlayerScore(playerName);
	return json(score);
}

export async function PUT({ request }) {
	const { playerName } = await request.json();
	await db.updatePlayerScore(playerName, 1);
	return new Response(null, { status: 204 });
}
