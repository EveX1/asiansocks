/*
 *PACKAGES
 */
import userExtract from './UserExtract';
import Config from './Config';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

/*
 * EXPRESS
 */

const app = express();
const configClass = new Config();
// configClass.setConfig();
configClass.getConfig();

const title = "Asian Socks";

const consumerkeyValues = configClass.getConfigApi('consumerkey');
const consumersecretValues = configClass.getConfigApi('consumersecret');
const tokenValues = configClass.getConfigApi('token');
const tokensecretValues = configClass.getConfigApi('tokensecret');
const ipValues = configClass.getConfigDb('ip');
const portValues = configClass.getConfigDb('port');
const dbValues = configClass.getConfigDb('db');
// const config = configClass.getConfig();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.render('index', {
    title: `Bienvenue sur ${title}`
}));

app.get('/registration', (req, res) => res.render('registration', {
    title: `Enregistrement sur ${title}`
}));

app.get('/config', (req, res) => res.render('config', {
    title: `Configuration de ${title}`,
    consumerkey: consumerkeyValues,
    consumersecret: consumersecretValues,
    token: tokenValues,
    tokenscret: tokensecretValues,
    ip: ipValues,
    port: portValues,
    db: dbValues
}))

app.post('/config', (req, res) => {
    // configClass.setConfigApi(req.body.customerkey, req.body.)
    // configClass.setConfigApi(req.body.customersecret, req.body.)
    // configClass.setConfigApi(req.body.token, req.body.)
    Object.keys(req.body).forEach(key => {
        if (key === "consumerkey" || "consumersecret" || "token" || "tokensecret") {
            configClass.setConfigApi(key, req.body[key]);
        } else if (key === "ip" || "port" || "db") {
            configClass.setConfigDb(key, req.body[key]);
        }
    })
    res.render('config', {});
});

app.listen(3000, () => console.log("Connected on: 3000"));