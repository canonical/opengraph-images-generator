import { session } from '$lib/server/oauth';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const s = await session.verify(event.cookies.get('session'));
	if (!s) {
		throw redirect(303, '/auth/login');
	}
	return {
		session: s
	};
};
