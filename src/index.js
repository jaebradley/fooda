#!/usr/bin/env node
'use es6';

import CommandRunner from './commands/CommandRunner';

const commandRunner = new CommandRunner();
commandRunner.run();