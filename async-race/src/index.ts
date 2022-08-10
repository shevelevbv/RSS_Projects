import Connector from './components/connector';
import Controller from './components/controller';
import Garage from './components/garage';
import Page from './components/page';
import State from './components/state';
import Winners from './components/winners/winners';

const page = new Page();
const connector = new Connector();
const garage = new Garage();
const winners = new Winners();
const state = new State(
  connector.getCars(garage.pageCount, Garage.carsPerPage),
  connector.getWinners(winners.pageCount, Winners.winnersPerPage),
);

const controller = new Controller(page, connector, garage, winners, state);

controller.startApp();
