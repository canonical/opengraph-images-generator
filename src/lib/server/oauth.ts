import { APP_HOST, AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import * as arctic from 'arctic';
import * as crypto from 'crypto';

export type Session = {
	email: string;
	name: string;
	photo: string;
	loggedAtTimestamp: number;
};

const redirectUri = `${APP_HOST}/auth/google/callback`;
const google = new arctic.Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUri);

const session = {
	create: async (email: string, name: string, photo: string) => {
		const session: Session = {
			email,
			name,
			photo,
			loggedAtTimestamp: new Date().getTime()
		};
		const payload = JSON.stringify(session);
		const signature = crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('hex');
		return `${payload}|${signature}`;
	},
	verify: async (s: string | undefined) => {
		try {
			const parts = s?.split('|');
			if (!parts || parts.length !== 2) return null;

			const [payload, signature] = parts;
			const expectedSignature = crypto
				.createHmac('sha256', AUTH_SECRET)
				.update(payload)
				.digest('hex');

			if (signature !== expectedSignature) return null;

			const session = JSON.parse(payload) as Session;

			const tokenAge = new Date().getTime() - session.loggedAtTimestamp;
			const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
			if (tokenAge > maxAge) return null;

			return session;
		} catch (error) {
			return null;
		}
	}
};

export { google, session };
