import { redirect, type Handle } from '@sveltejs/kit';
import { accessCookieName, accessPassword, accessToken } from '$lib/server/access';

const publicPaths = new Set(['/login', '/robots.txt']);

function isPublicPath(pathname: string) {
	return publicPaths.has(pathname) || pathname.startsWith('/_app/') || pathname.startsWith('/favicon');
}

export const handle: Handle = async ({ event, resolve }) => {
	const password = accessPassword();

	if (!password || isPublicPath(event.url.pathname)) {
		return resolve(event);
	}

	const expectedToken = await accessToken(password);
	if (event.cookies.get(accessCookieName) === expectedToken) {
		return resolve(event);
	}

	const next = `${event.url.pathname}${event.url.search}`;
	throw redirect(303, `/login?next=${encodeURIComponent(next)}`);
};
