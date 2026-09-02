import { redirect, type RequestHandler } from '@sveltejs/kit';
import { accessCookieName } from '$lib/server/access';

export const POST: RequestHandler = async ({ cookies, url }) => {
	cookies.delete(accessCookieName, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: url.protocol === 'https:'
	});

	throw redirect(303, '/login');
};
