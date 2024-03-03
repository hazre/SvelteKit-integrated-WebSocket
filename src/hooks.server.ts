import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import type { ExtendedGlobal } from '$lib/server/webTorrentUtils';
import { GlobalThisWT } from '$lib/server/webTorrentUtils';

let wtInitialized = false;
const startupWebtorrent = () => {
	if (wtInitialized) return;
	console.log('[wt:kit] setup');
	const wt = (globalThis as ExtendedGlobal)[GlobalThisWT];
	if (wt !== undefined) {
		console.log(`[wt:kit] client is initialized (${wt.socketId})`);
		wtInitialized = true;
	}
};

export const handle = (async ({ event, resolve }) => {
	startupWebtorrent();
	if (!building) {
		const wt = (globalThis as ExtendedGlobal)[GlobalThisWT];
		if (wt !== undefined) {
			event.locals.wt = wt;
		}
	}
	const response = await resolve(event);
	return response;
}) satisfies Handle;
