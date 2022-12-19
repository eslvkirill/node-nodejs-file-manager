import { createWriteStream } from 'node:fs';
import { join } from 'node:path';

export const add = async (workdir, newFilename) =>
  new Promise((resolve, reject) => {
    const path = join(workdir, newFilename);
    const stream = createWriteStream(path, { flags: 'wx' });

    stream
      .on('close', resolve)
      .on('error', () => reject(new Error('Operation failed')))
      .close();
  });
