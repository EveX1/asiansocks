/*
 *PACKAGES
 */
import userExtract from './UserExtract';
import Config from './Config';
import Cmd from './Cmd';
import Server from './Server';

const server = new Server();
server.run();

// const myApp = new Cmd();

// myApp.extract();