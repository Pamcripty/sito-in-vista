#!/usr/bin/env node
/* Server statico minimo per guardare il sito in locale: `npm start`. */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const PORTA = Number(process.env.PORTA || process.env.PORT || 4173);

const TIPI = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  try {
    const percorso = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(DIST, percorso);
    if (!file.startsWith(DIST)) throw new Error('fuori cartella');

    const info = await stat(file).catch(() => null);
    if (!info || info.isDirectory()) file = path.join(file, 'index.html');

    const corpo = await readFile(file);
    res.writeHead(200, {
      'content-type': TIPI[path.extname(file)] || 'application/octet-stream',
      'cache-control': 'no-cache',
    });
    res.end(corpo);
  } catch {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<h1>404</h1><p>Pagina non trovata.</p>');
  }
}).listen(PORTA, () => {
  console.log(`  Sito in Vista in ascolto su http://localhost:${PORTA}`);
});
