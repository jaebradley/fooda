'use es6';

import program from 'commander';
import MenuCommand from './MenuCommand';

export default class CommandRunner {
  constructor() {
    this.menuCommand = new MenuCommand()
  }

  run() {
    program.version("0.0.1");

    program.command("menu [location]")
            .description("get fooda data")
            .action(location => this.menuCommand.run(location))

    program.parse(process.argv);
  }
}
