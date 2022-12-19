import { EOL } from 'node:os';

import { parseProcessArgv } from './utils/parser.js';
import { initCommands } from './commands/index.js';

try {
  const { username } = parseProcessArgv();

  if (!username) {
    throw new Error('Property "--username" is empty');
  }

  console.info(`Welcome to the File Manager, ${username}!`);
  process.on('SIGINT', process.exit);
  process.on('exit', () =>
    console.info(`${EOL}Thank you for using File Manager, ${username}!`)
  );
  initCommands();
} catch (err) {
  console.error(err.message);
  process.exit(0);
}
