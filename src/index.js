/*
 *PACKAGES
 */
import userExtract from './UserExtract';
import Config from './Config';
import express from 'express';
import bodyParser from 'body-parser';

/*
 * EXPRESS
 */

const app = express();
const title = "Asian Socks"

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.render('index', {
    title: `Bienvenue sur ${title}`
}));

app.get('/config', (req, res) => res.render('config', {
    title: `Configuration de ${title}`
}));

app.post('/config', (req, res) => {
    res.render('index', {
        consumerkey: req.body.consumerkey
    });
});

app.listen(3000, () => console.log("Connected on: 3000"));




/*
 * FONCTIONNEMENT APPLI
 */
// récupérer le fichier config
const configClass = new Config();
const config = configClass.getConfig();

// recuperation des keywords le tableau de keywords
const keywords = configClass.args.keywords.split(',');


//recuperation des tweets
const userextract = new userExtract(
    config.default.api.twitter.consumerkey,
    config.default.api.twitter.consumersecret,
    config.default.api.twitter.token,
    config.default.api.twitter.tokensecret,
    config.default.db.ip,
    config.default.db.port,
    config.default.db.db,
    configClass.args.delay
);

userextract.extract(keywords);

console.log('Coucou');