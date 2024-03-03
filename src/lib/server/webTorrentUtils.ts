import { nanoid } from 'nanoid';
import WebTorrent from 'webtorrent';

export const GlobalThisWT = Symbol.for('sveltekit.wt');

export interface ExtendedWebTorrent extends WebTorrent.Instance {
	socketId: string;
}

export type ExtendedGlobal = typeof globalThis & {
	[GlobalThisWT]: ExtendedWebTorrent;
};

export const createWTGlobalInstance = () => {
	const wt = new WebTorrent() as ExtendedWebTorrent;

	(globalThis as ExtendedGlobal)[GlobalThisWT] = wt;

	wt.socketId = nanoid();
	console.log(`[wt:global] initialized client (${wt.socketId})`);

	wt.on('torrent', function (torrent) {
		console.log(`[wt:global] Torrent added: ${torrent.infoHash}`);
	});

	wt.on('error', function (err) {
		console.error(`[wt:global] Error occurred: ${err}`);
	});

	return wt;
};

export const announce = [
	atob('d3NzOi8vdHJhY2tlci5vcGVud2VidG9ycmVudC5jb20='),
	atob('d3NzOi8vdHJhY2tlci53ZWJ0b3JyZW50LmRldg=='),
	atob('d3NzOi8vdHJhY2tlci5maWxlcy5mbTo3MDczL2Fubm91bmNl'),
	atob('d3NzOi8vdHJhY2tlci5idG9ycmVudC54eXov'),
	atob('dWRwOi8vb3Blbi5zdGVhbHRoLnNpOjgwL2Fubm91bmNl'),
	atob('aHR0cDovL255YWEudHJhY2tlci53Zjo3Nzc3L2Fubm91bmNl'),
	atob('dWRwOi8vdHJhY2tlci5vcGVudHJhY2tyLm9yZzoxMzM3L2Fubm91bmNl'),
	atob('dWRwOi8vZXhvZHVzLmRlc3luYy5jb206Njk2OS9hbm5vdW5jZQ=='),
	atob('dWRwOi8vdHJhY2tlci5jb3BwZXJzdXJmZXIudGs6Njk2OS9hbm5vdW5jZQ=='),
	atob('dWRwOi8vOS5yYXJiZy50bzoyNzEwL2Fubm91bmNl'),
	atob('dWRwOi8vdHJhY2tlci50b3JyZW50LmV1Lm9yZzo0NTEvYW5ub3VuY2U='),
	atob('aHR0cDovL29wZW4uYWNnbnh0cmFja2VyLmNvbTo4MC9hbm5vdW5jZQ=='),
	atob('aHR0cDovL2FuaWRleC5tb2U6Njk2OS9hbm5vdW5jZQ=='),
	atob('aHR0cDovL3RyYWNrZXIuYW5pcmVuYS5jb206ODAvYW5ub3VuY2U=')
];
