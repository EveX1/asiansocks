/*
 *PACKAGES
 */
import userExtract from './UserExtract';
import Config from './Config';
import Cmd from './Cmd';
import Server from './Server';
import mongoose from 'mongoose';


/*
 * CONNECTION A MONGO
 */
const configClass = new Config();
const config = configClass.getConfig();

const connect = (ip, port, db) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(`mongodb://${ip}:${port}/${db}`, err => {
            if(err){reject(err); return}
            resolve(true);
        })
    })
}
connect(config.default.db.ip, config.default.db.port, config.default.db.db).then(response => {
    console.log('#####Connected#####');
    const server = new Server();
    server.run();
}).catch(e => console.log(e));

// const myApp = new Cmd();
//
// myApp.extract();