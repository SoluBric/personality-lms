import { fail, redirect } from '@sveltejs/kit';
import { accessCookieMaxAge, accessCookieName, accessPassword, accessProtectionRequired, accessToken } from '$lib/server/access';
import type { Actions, PageServerLoad } from './$types';

function nextUrl(value: string | null, requestUrl: URL) {
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

export const load: PageServerLoad = async ({ cookies, url }) => {
	const password = accessPassword();
	if (password && cookies.get(accessCookieName) === (await accessToken(password))) {
		throw redirect(303, nextUrl(url.searchParams.get('next'), url));
	}

	return {
		protectionEnabled: Boolean(password),
		configurationRequired: accessProtectionRequired() && !password
	};
};

export const actions: Actions = {
	default: async ({ cookies, request, url }) => {
		const password = accessPassword();
		const data = await request.formData();
		const submittedPassword = String(data.get('password') ?? '');

		if (!password) {
			return fail(400, {
				message: 'Access protection has not been configured yet.'
			});
		}

		if (submittedPassword !== password) {
			return fail(401, {
				message: 'That access code is not correct.'
			});
		}

		cookies.set(accessCookieName, await accessToken(password), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: url.protocol === 'https:',
			maxAge: accessCookieMaxAge
		});

		throw redirect(303, nextUrl(url.searchParams.get('next'), url));
	}
};
