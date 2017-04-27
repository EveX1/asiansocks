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
     * EXPRESS
     */

    const app = express();
    const title = "Asian Socks"

//utilisation du répertoire 'public' pour les css et cie
    app.use(express.static(path.join(__dirname, '/../public')));

// Use the session middleware
    const sessParam = {
        secret:'secret',
        cookie: {
            maxAge: 60000
        }
    };
    app.use(session(sessParam));



    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '/../views'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/', (req, res) => res.render('index', {
        title: `Bienvenue sur ${title}`
    }));

    app.get('/registration', (req, res) => {
        let msg = "";
        if(!_.isEmpty(req.param("msg"))){
            msg = req.param("msg");
        }
        res.render('registration', {
            title: `Enregistrement sur ${title}`,
            msg: msg
        })
    });

    app.post('/registration', (req, res) => {
        if(!_.isEmpty(req.body.pseudo) && !_.isEmpty(req.body.pass) && !_.isEmpty(req.body.passConf)){
            if(req.body.pass === req.body.passConf){
                //enregistrement dans la bdd
                if(mongoose.connection._readyState === 1){
                    //ENCRYPTION
                    const saltRounds = 10;
                    encrypt.hash(req.body.pass, saltRounds, (err, hash) => {
                        user.registerInDb(req.body.pseudo, hash);
                        res.redirect('/registration?msg=ok');
                    })
                } else {
                    res.redirect('/registration?msg=connect');
                }
            } else {
                res.redirect('/registration?msg=pass');
            }
        } else {
            res.redirect('/registration?msg=empty');
        }

    })

    app.get('/login', (req, res) => {
        let msg = "";
        if(!_.isEmpty(req.param("msg"))){
            msg = req.param("msg");
        }
        res.render('login', {
            title: `AsianSocks login`,
            msg: msg
        });
    });

    app.post('/login', (req, res) => {
        if(mongoose.connection._readyState === 1){
            user.connectz(req.body.pseudo, req.body.pass)
                .then(user => {
                    console.log(`find user : ${user.username}`)
                    //password verification
                    encrypt.compare(req.body.pass, user.pass, (err, resp) => {
                        if(resp){
                            console.log(`user connected`)
                            //save session
                            req.session.connected = true;
                            req.session.pseudo = req.body.pseudo;
                            res.redirect('/config');
                        } else {
                            console.log(`wrong pass`)
                            res.redirect('/login?msg=e');
                        }
                    });
                })
                .catch(e => {
                    console.log(`no user found ${e}`)
                    res.redirect('/login?msg=e');
                })
            ;
        }
    });



    app.get('/config', (req, res) => {
        if(req.session.connected){
            res.render('config', {
                title: `Configuration de ${title}`,
                pseudo: req.session.pseudo
            })
        } else {
            res.render('unauth', {
                title: `Acces interdit`
            })
        }
    });

    app.post('/config', (req, res) => {
        res.render('config', {
            consumerkey: req.body.consumerkey,
            consumersecret: req.body.consumersecret,
            token: req.body.token,
            tokenscret: req.body.tokenscret,
            ip: req.body.ip,
            port: req.body.port,
            db: req.body.db,
            config: req.body.config
        });
    });

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/config');
    });

    app.listen(3000, () => console.log("Connected on: 3000"));

}).catch(e => console.log(e));