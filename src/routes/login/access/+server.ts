import { json, type RequestHandler } from '@sveltejs/kit';
import { grantAccess, safeNextUrl, sameOriginSubmission } from '$lib/server/access';

type LoginPayload = {
	password?: unknown;
	next?: unknown;
};

export const POST: RequestHandler = async ({ cookies, request, url }) => {
	if (!sameOriginSubmission(request, url)) {
		return json({ message: 'Cross-site login submissions are forbidden.' }, { status: 403 });
	}

	const data = (await request.json().catch(() => undefined)) as LoginPayload | undefined;
	const submittedPassword = typeof data?.password === 'string' ? data.password : '';
	const result = await grantAccess(cookies, url, submittedPassword);

	if (!result.granted) return json({ message: result.message }, { status: result.status });

	return json({ location: safeNextUrl(typeof data?.next === 'string' ? data.next : null, url) });
};
