import { rm as remove } from 'node:fs/promises';

import { concatPath } from '../../utils/fs.js';

export const rm = async (workdir, path) => {
  try {
    path = concatPath(workdir, path);
    await remove(path);
  } catch {
    throw new Error('Operation failed');
  }
};
