import { EOL, homedir } from 'node:os';
import { createInterface } from 'node:readline';

import { parseCommand } from '../utils/parser.js';
import fs from './fs/index.js';
import hash from './hash/index.js';
import nwd from './nwd/index.js';
import os from './os/index.js';
import zip from './zip/index.js';

const commands = { ...nwd, ...os, ...fs, ...hash, ...zip };

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});
let pathToWorkdir = homedir();

export const initCommands = () => {
  readline.question(
    `You are currently in ${pathToWorkdir}, enter your command:${EOL}> `,
    async (command) => {
      command = command.trim();

      if (command === '.exit') process.exit(0);

      try {
        const [operation, ...args] = parseCommand(command);

        if (
          !commands[operation] ||
          commands[operation]?.length !== args.length + 1
        ) {
          throw new Error('Invalid input');
        }

        const result = await commands[operation](pathToWorkdir, ...args);

        if (result && result.workdir !== pathToWorkdir && result.workdir) {
          pathToWorkdir = result.workdir;
        }

        if (result?.data) {
          console[result.outputType || 'info'](result.data);
        }
      } catch (err) {
        console.error(err.message);
      }

      initCommands();
    }
  );
};
