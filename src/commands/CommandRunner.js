'use es6';

import program from 'commander';
import emoji from 'node-emoji';
import MenuCommand from './MenuCommand';
import Help from './Help';
import LocationOption from '../data/LocationOption';

export default class CommandRunner {
  constructor() {
    this.menuCommand = new MenuCommand();
    this.screamEmoji = emoji.get('scream');
    this.astonishedEmoji = emoji.get('astonished');
    this.rutroEmojis = `${this.screamEmoji} ${this.astonishedEmoji} ${this.screamEmoji} ${this.astonishedEmoji}`;
  }

  run() {
    program.version("0.0.1");

    program.on('help', function() { 
        console.log(Help.TEXT);
        process.exit(1); 
    });

    program.command("menu [location]")
            .description("get fooda data")
            .action((function(location) {
              if (typeof location == 'undefined' || !LocationOption.isValid(location)) {
                console.log(`${this.rutroEmojis} ${location} is not a valid location ${this.rutroEmojis}`);
                console.log(Help.TEXT);
              } else {
                this.menuCommand.run(location);
              }
            }).bind(this));

    program.parse(process.argv);

    if (program.args.length === 0) {
      console.log(Help.TEXT);
    }
  }
}
