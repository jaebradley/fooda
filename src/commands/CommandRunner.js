'use es6';

import program from 'commander';
import emoji from 'node-emoji';
import MenuCommand from './MenuCommand';
import Help from './Help';
import Location from '../data/Location';

export default class CommandRunner {
  static getRutroEmojis() {
    return `${emoji.get('scream')} ${emoji.get('astonished')} ${emoji.get('scream')} ${emoji.get('astonished')}`;
  }

  static run() {
    program.version("0.0.1");

    program.on('help', function() {
        console.log(Help.TEXT);
        process.exit(1);
    });

    program.command("menu <location>")
            .description("get fooda data")
            .action((function(location) {
              if (typeof location == 'undefined' || ((location.toUpperCase() !== 'HUBSPOT') && (location.toUpperCase() !== 'DAVENPORT'))) {
                console.log(`${CommandRunner.getRutroEmojis()} ${location} is not a valid location ${CommandRunner.getRutroEmojis()}`);
                console.log(Help.TEXT);
              } else {
                MenuCommand.run(location);
              }
            }).bind(this));

    program.parse(process.argv);

    if (program.args.length === 0) {
      console.log(Help.TEXT);
    }
  }
}
