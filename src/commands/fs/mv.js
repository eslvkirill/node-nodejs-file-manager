import { createReadStream, createWriteStream } from 'node:fs';
import { rm } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { pipeline } from 'node:stream';

import { concatPath } from '../../utils/fs.js';

export const mv = async (workdir, path, newDirPath) => {
  try {
    newDirPath = concatPath(workdir, newDirPath);
    path = concatPath(workdir, path);

    const filename = basename(path);
    const newFilePath = join(newDirPath, filename);
    const readStream = createReadStream(path);
    const writeStream = createWriteStream(newFilePath, { flags: 'wx' });

    await pipeline(readStream, writeStream);
    await rm(path);
  } catch {
    throw new Error('Operation failed');
  }
};
