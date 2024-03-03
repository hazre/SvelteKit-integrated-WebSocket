import * as path from 'path';
import * as url from 'url';
import { createWTGlobalInstance } from './src/lib/server/webTorrentUtils';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

createWTGlobalInstance();

// Check if the process is running on Windows
const isWindows = process.platform === 'win32';

// Adjust the import path based on the operating system
const serverImportPath = isWindows
	? `file://${path.resolve(__dirname, './build/index.js')}`
	: path.resolve(__dirname, './build/index.js');

const { server } = await import(serverImportPath);
