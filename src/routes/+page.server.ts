import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { announce } from '$lib/server/webTorrentUtils';
import type { Torrent } from 'webtorrent';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const torrentId = data.get('torrentId');

		if (!torrentId) {
			return fail(400, { torrentId, missing: true });
		}

		if (!locals.wt) {
			return fail(400, { error: '[wt] client is not initialized' });
		}

		locals.wt.add(torrentId, {
			announce: announce
		});

		return { success: true, message: 'Torrent added' };
	}
} satisfies Actions;
