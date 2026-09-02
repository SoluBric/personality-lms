import type { Handle } from '@sveltejs/kit';
import { accessCookieName, accessPassword, accessProtectionRequired, accessToken } from '$lib/server/access';

const publicPaths = new Set(['/login', '/login/access', '/logout', '/robots.txt']);
const securityHeaders = {
	'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests",
	'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
	'referrer-policy': 'no-referrer',
	'x-content-type-options': 'nosniff',
	'x-frame-options': 'DENY',
	'x-robots-tag': 'noindex, nofollow'
};

function isPublicPath(pathname: string) {
	return publicPaths.has(pathname) || pathname.startsWith('/_app/') || pathname.startsWith('/favicon');
}

function withSecurityHeaders(response: Response) {
	for (const [name, value] of Object.entries(securityHeaders)) {
		response.headers.set(name, value);
	}
	return response;
}

function redirectResponse(location: string) {
	return withSecurityHeaders(
		new Response(null, {
			status: 303,
			headers: { location }
		})
	);
}

export const handle: Handle = async ({ event, resolve }) => {
	const password = accessPassword();

	if (isPublicPath(event.url.pathname)) {
		return withSecurityHeaders(await resolve(event));
	}

	if (!password && !accessProtectionRequired()) {
		return withSecurityHeaders(await resolve(event));
	}

	if (!password) {
		return withSecurityHeaders(new Response('Access protection is not configured.', { status: 503 }));
	}

	const expectedToken = await accessToken(password);
	if (event.cookies.get(accessCookieName) === expectedToken) {
		return withSecurityHeaders(await resolve(event));
	}

	const next = `${event.url.pathname}${event.url.search}`;
	return redirectResponse(`/login?next=${encodeURIComponent(next)}`);
};
