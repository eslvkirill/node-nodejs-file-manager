import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream';

import { concatPath } from '../../utils/fs.js';

export const decompress = async (workdir, path, archivePath) => {
  try {
    path = concatPath(workdir, path);
    archivePath = concatPath(workdir, archivePath);

    const writeStream = createWriteStream(archivePath, { flags: 'wx' });
    const readStream = createReadStream(path);
    const brotliCompress = createBrotliDecompress();

    await pipeline(readStream, brotliCompress, writeStream);
  } catch (error) {
    console.log(error);
    throw new Error('Operation failed');
  }
};
