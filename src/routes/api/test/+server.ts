import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, locals }) => {
	if (!locals.wt) {
		return error(500, '[wt] client is not initialized');
	}

	locals.wt.torrents.forEach((torrent) => {
		const files = torrent.files.map((file) => {
			return file.name;
		});
		console.log('Torrent', {
			name: torrent.name,
			files: files
		});
	});

	return json({
		success: true,
		url,
		torrents: locals.wt?.torrents.map((torrent) => {
			return {
				name: torrent.name,
				progress: torrent.progress,
				done: torrent.done
			};
		})
	});
}) satisfies RequestHandler;
