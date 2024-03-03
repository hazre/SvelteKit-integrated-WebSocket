import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { createWTGlobalInstance } from './src/lib/server/webTorrentUtils';

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'integratedWebsocketServer',
			configureServer() {
				createWTGlobalInstance();
			},
			configurePreviewServer() {
				createWTGlobalInstance();
			}
		}
	]
});
