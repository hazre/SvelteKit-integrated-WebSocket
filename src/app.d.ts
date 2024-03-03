import type { ExtendedWebTorrent } from '$lib/server/webTorrentUtils';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			wt?: ExtendedWebTorrent;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
