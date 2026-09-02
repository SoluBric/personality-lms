import { json, type RequestHandler } from '@sveltejs/kit';
import { revokeAccess, sameOriginSubmission } from '$lib/server/access';

export const POST: RequestHandler = async ({ cookies, request, url }) => {
	if (!sameOriginSubmission(request, url)) {
		return json({ message: 'Cross-site logout submissions are forbidden.' }, { status: 403 });
	}

	revokeAccess(cookies, url);

	return json({ location: '/login' });
};
