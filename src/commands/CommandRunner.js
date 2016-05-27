'use es6';

import program from "commander";
import FoodaClient from '../clients/FoodaClient';
import MenuTable from '../tables/MenuTable';

export default class CommandRunner {
  constructor() {
    this.client = new FoodaClient();
  }

  run() {
    program.version("0.0.1");

    program.command("menu [location]")
            .description("get fooda data")
            .action(location => this.client.fetch(location).then(menus => menus.map(menu => console.log(MenuTable.create(menu)))));

    program.parse(process.argv);
  }
}
