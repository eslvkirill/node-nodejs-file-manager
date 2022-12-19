import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream';

import { concatPath } from '../../utils/fs.js';

export const compress = async (workdir, path, archivePath) => {
  try {
    path = concatPath(workdir, path);
    archivePath = concatPath(workdir, archivePath);

    const writeStream = createWriteStream(archivePath, { flags: 'wx' });
    const readStream = createReadStream(path);
    const brotliCompress = createBrotliCompress();

    await pipeline(readStream, brotliCompress, writeStream);
  } catch {
    throw new Error('Operation failed');
  }
};
