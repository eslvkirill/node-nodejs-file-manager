import { rename } from 'node:fs/promises';
import { dirname, join, normalize } from 'node:path';

import { concatPath, isAccess } from '../../utils/fs.js';

export const rn = async (workdir, path, newFile) => {
  try {
    path = concatPath(workdir, normalize(path));

    const dirPath = dirname(path);
    const newFilePath = join(dirPath, newFile);
    const isAccessToNewFile = await isAccess(newFilePath);

    if (isAccessToNewFile || dirname(newFilePath) !== dirPath) {
      throw new Error();
    }

    await rename(path, newFilePath);
  } catch {
    throw new Error('Operation failed');
  }
};
