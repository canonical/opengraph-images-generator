import { google, session } from '$lib/server/oauth';
import type { RequestEvent } from '@sveltejs/kit';
import { decodeIdToken, type OAuth2Tokens } from 'arctic';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const codeVerifier = event.cookies.get('google_code_verifier');
	const storedState = event.cookies.get('google_oauth_state');

	if (!code || !state || !codeVerifier) {
		return new Response(
			JSON.stringify({
				error: 'Missing required parameters'
			}),
			{
				status: 400
			}
		);
	}
	if (storedState !== state) {
		return new Response(
			JSON.stringify({
				error: 'Invalid state'
			}),
			{
				status: 400
			}
		);
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		console.error(e);
		return new Response(
			JSON.stringify({
				error: 'Invalid authorization code'
			}),
			{
				status: 400
			}
		);
	}

	const claims = decodeIdToken(tokens.idToken()) as Record<string, string>;

	const sub = claims.sub;

	if (typeof sub !== 'string') {
		return new Response(
			JSON.stringify({
				error: 'Invalid claims'
			}),
			{
				status: 400
			}
		);
	}

	if ((claims.email_verified as unknown as boolean) !== true) {
		return new Response(
			JSON.stringify({
				error: 'Email not verified'
			}),
			{
				status: 400
			}
		);
	}

	event.cookies.delete('google_oauth_state', {
		path: '/'
	});
	event.cookies.delete('google_code_verifier', {
		path: '/'
	});

	event.cookies.set('session', await session.create(claims.email, claims.name, claims.picture), {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 30, // 30 days
		sameSite: 'lax'
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
