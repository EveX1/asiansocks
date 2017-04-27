/*
 *PACKAGES
 */
import userExtract from './UserExtract';
import Config from './Config';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import ConfigCtrl from './controllers/ConfigCtrl';

/*
 * EXPRESS
 */

export default class Server {
    constructor() {
        this._app = express();

        this._title = "Asian Socks";

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