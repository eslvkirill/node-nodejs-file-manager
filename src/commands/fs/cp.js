import { basename, join } from 'node:path';
import { pipeline } from 'node:stream';

import { concatPath } from '../../utils/fs.js';

export const cp = async (workdir, path, newDirPath) => {
  try {
    newDirPath = concatPath(workdir, newDirPath);
    path = concatPath(workdir, path);

    const filename = basename(path);
    const newFilePath = join(newDirPath, filename);
    const readStream = createReadStream(path);
    const writeStream = createWriteStream(newFilePath, { flags: 'wx' });

    await pipeline(readStream, writeStream);
  } catch {
    throw new Error('Operation failed');
  }
};
