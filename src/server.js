/*
 *PACKAGES
 */
import _ from 'underscore';
import Config from './Config';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import mongoose from 'mongoose';
import encrypt from 'bcrypt';
mongoose.Promise = global.Promise;
import AppUser from './AppUser';


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
    const user = new AppUser();

    /*
     * SERVER
     */
    export default class Server {
        constructor() {
            this._app = express();

            this._title = "Asian Socks";

            // Use the session middleware
            this.sessParam = {
                secret:'secret',
                cookie: {
                    maxAge: 60000
                }
            };
            this._app.use(session(sessParam));
            

            this._app.use(express.static(path.join(__dirname, '/../public')));

            this._app.get('/', (req, res) => res.render('index', {
                title: this._title
            }));

            this._app.set('view engine', 'pug');
            this._app.set('views', path.join(__dirname, '/../views'));
            this._app.use(bodyParser.json());
            this._app.use(bodyParser.urlencoded({
                extended: true
            }));
        }

        _initControllers() {
            const configCtrl = new ConfigCtrl();

            this._app.get('/config', configCtrl.index);
            this._app.post('/config', configCtrl.form);
        }

        run() {
            this._initControllers();

            this._app.listen(3000, () => console.log("Connected on: 3000"));
        }
    }
}).catch(e => console.log(e));