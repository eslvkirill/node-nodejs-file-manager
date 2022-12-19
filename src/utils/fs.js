import { access } from 'node:fs/promises';
import { dirname, isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pathToDir = (url) => dirname(fileURLToPath(url));

const isAccess = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const concatPath = (source, dest) => {
  if (isAbsolute(dest)) return dest;
  return join(source, dest);
};

const calculateSize = (size) => {
  const prefixes = ['byte', 'KiB', 'MiB', 'GiB', 'TiB'];
  const counter = 0;

  while (size >= 1000) {
    if (counter === prefixes.length - 1) break;

    size = Math.round(size / 1000);
    counter++;
  }

  return `${Intl.NumberFormat('en-US').format(size)} ${prefixes[counter]}`;
};

export { pathToDir, isAccess, concatPath, calculateSize };
