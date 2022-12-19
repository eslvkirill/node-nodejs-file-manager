import { createReadStream } from 'node:fs';

import { concatPath } from '../../utils/fs.js';

export const cat = (workdir, path) =>
  new Promise((resolve, reject) => {
    path = concatPath(workdir, path);

    const stream = createReadStream(path, { encoding: 'utf-8' });

    stream
      .on('data', console.info)
      .on('close', resolve)
      .on('error', () => reject(new Error('Operation failed')));
  });
