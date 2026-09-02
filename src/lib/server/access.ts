import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';

export const accessCookieName = 'personality_lms_access';
export const accessCookieMaxAge = 60 * 60 * 24 * 3;

export function accessPassword() {
	return env.DEMO_ACCESS_PASSWORD?.trim() ?? '';
}

export function accessProtectionRequired() {
	return !dev;
}

export function safeNextUrl(value: string | null, requestUrl: URL) {
	if (!value || value === '/') return '/about';

	if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
		return '/about';
	}

	try {
		const target = new URL(value, requestUrl.origin);
		if (target.origin !== requestUrl.origin) return '/about';
		return `${target.pathname}${target.search}${target.hash}`;
	} catch {
		return '/about';
	}
}

export function sameOriginSubmission(request: Request, requestUrl: URL) {
	const origin = request.headers.get('origin');
	if (origin) return origin === requestUrl.origin;

	return request.headers.get('sec-fetch-site') === 'same-origin';
}

export async function grantAccess(cookies: Cookies, requestUrl: URL, submittedPassword: string) {
	const password = accessPassword();
	if (!password) {
		return {
			granted: false,
			status: 400,
			message: 'Access protection has not been configured yet.'
		} as const;
	}

	if (submittedPassword !== password) {
		return {
			granted: false,
			status: 401,
			message: 'That access code is not correct.'
		} as const;
	}

	cookies.set(accessCookieName, await accessToken(password), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: requestUrl.protocol === 'https:',
		maxAge: accessCookieMaxAge
	});

	return { granted: true } as const;
}

export async function accessToken(password: string) {
	const input = new TextEncoder().encode(`personality-lms-demo:${password}`);
	const digest = await crypto.subtle.digest('SHA-256', input);
	return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
