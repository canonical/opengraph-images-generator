import { session } from '$lib/server/oauth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authorization: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	if (path.startsWith('/auth')) {
		return resolve(event);
	}

	const loggedIn = await session.verify(event.cookies.get('session'));
	if (!loggedIn) {
		throw redirect(303, '/auth/login');
	}

	return resolve(event);
};

export const handle: Handle = sequence(authorization);
