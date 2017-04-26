/*
 *PACKAGES
 */
import userExtract from './UserExtract';
import Config from './Config';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Cmd from './Cmd';

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