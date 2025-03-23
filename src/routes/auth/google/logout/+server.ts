import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	// Clear the session cookie
	event.cookies.delete('session', { path: '/' });

	// Redirect to the home page
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
};
