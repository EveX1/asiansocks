/*
 *PACKAGES
 */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import ConfigCtrl from './controllers/ConfigCtrl';
import RegistrationCtrl from './controllers/RegistrationCtrl';
import LoginCtrl from './controllers/LoginCtrl';
import AppParam from './AppParam';



/*
 * EXPRESS
 */

export default class Server {
    constructor() {
        this._app = express();

        //app params
        const params = new AppParam();
        this.title = params.title;

        // Use the session middleware
        this.sessParam = {
            secret:'secret',
            cookie: {
                maxAge: 60000
            }
        };
        this._app.use(session(this.sessParam));

        this._app.use(express.static(path.join(__dirname, '/../public')));

        this._app.get('/', (req, res) => res.render('index', {
            title: this.title
        }));

        this._app.get('/logout', (req, res) => {
            //destroy session
            req.session.destroy();
            res.redirect('/');
        });

        this._app.set('view engine', 'pug');
        this._app.set('views', path.join(__dirname, '/../views'));
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    _initControllers() {
        const configCtrl = new ConfigCtrl(this.title);
        const registrationCtrl = new RegistrationCtrl(this.title);
        const loginCtrl = new LoginCtrl(this.title);

        this._app.get('/config', configCtrl.index.bind(loginCtrl));
        this._app.post('/config', configCtrl.form);
        this._app.get('/registration', registrationCtrl.index.bind(loginCtrl));
        this._app.post('/registration', registrationCtrl.form);
        this._app.get('/login', loginCtrl.index.bind(loginCtrl));
        this._app.post('/login', loginCtrl.form);
    }

    run() {
        this._initControllers();

        this._app.listen(3000, () => console.log("Connected on: 3000"));
    }
}
