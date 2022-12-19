import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream';

import { concatPath } from '../../utils/fs.js';

export const hash = async (workdir, path) => {
  try {
    path = concatPath(workdir, path);

    const readStream = createReadStream(path);
    const hashStream = createHash('sha256');

    await pipeline(readStream, hashStream);

    return { data: hashStream.digest('hex') };
  } catch {
    throw new Error('Operation failed');
  }
};
