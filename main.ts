// Entry point for the news-image-20261122 bounty.
// This program copies the bundled editorial PNG into the grader's output directory.
// It runs on Node 22 with only the standard library.

import { copyFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Make sure the output directory exists before copying.
mkdirSync(outDir, { recursive: true });

const src = join(here, 'entry.png');
const dst = join(outDir, 'entry.png');

if (!existsSync(src)) {
  throw new Error('entry.png is missing from the repository');
}

// Guard: the image must stay under the 1 MiB gate limit.
const bytes = statSync(src).size;
if (bytes > 1024 * 1024) {
  throw new Error(`entry.png is too large: ${bytes} bytes`);
}

copyFileSync(src, dst);

// Report what was written; harmless outside the grader, useful when testing locally.
console.log(`wrote ${dst} (${bytes} bytes)`);
