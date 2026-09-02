import { fail, redirect } from '@sveltejs/kit';
import { accessCookieName, accessPassword, accessProtectionRequired, accessToken, grantAccess, safeNextUrl } from '$lib/server/access';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url }) => {
	const password = accessPassword();
	if (password && cookies.get(accessCookieName) === (await accessToken(password))) {
		throw redirect(303, safeNextUrl(url.searchParams.get('next'), url));
	}

	return {
		protectionEnabled: Boolean(password),
		configurationRequired: accessProtectionRequired() && !password,
		next: safeNextUrl(url.searchParams.get('next'), url)
	};
};

export const actions: Actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const submittedPassword = String(data.get('password') ?? '');
		const result = await grantAccess(cookies, url, submittedPassword);

		if (!result.granted) return fail(result.status, { message: result.message });

		throw redirect(303, safeNextUrl(url.searchParams.get('next'), url));
	}
};
