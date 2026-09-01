import { env } from '$env/dynamic/private';

export const accessCookieName = 'personality_lms_access';

export function accessPassword() {
	return env.DEMO_ACCESS_PASSWORD?.trim() ?? '';
}

export function accessProtectionRequired() {
	return env.CF_PAGES === '1';
}

export async function accessToken(password: string) {
	const input = new TextEncoder().encode(`personality-lms-demo:${password}`);
	const digest = await crypto.subtle.digest('SHA-256', input);
	return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
