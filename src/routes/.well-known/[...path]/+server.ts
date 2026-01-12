// Handle .well-known requests to prevent 404 errors in console
export async function GET() {
	return new Response(null, { status: 204 });
}
