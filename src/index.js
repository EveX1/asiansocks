/*
 *PACKAGES
 */
//recuperer un flux twitter
const Twitter = require('node-tweet-stream')

//lire et ecrure dansun fichier
import fs from 'fs';
import ArgParseObj from 'argparse';
import path from 'path';
//lire les infos d'un fichier yml
const yaml = require('js-yaml');



/*
 * PARSER de mots-clés et Paramètres d'API Twitter
 */

const ArgParse = ArgParseObj.ArgumentParser;

const parser = new ArgParse({
    version: '0.0.1',
    addHelp: true,
    description: 'config.yml parser'
});

parser.addArgument(
    ['-k', '--keywords'], {
        help: 'Liste de mots à utiliser pour recherche flux twitter'
    }
);

parser.addArgument(
    ['-c', '--config'], {
        help: 'Chemin du fichier de configuration pour API Twitter',
        defaultValue: "/config"
    }
);

// enregistrer l'ensemble des arguments et leur valeur dans un objet args
const args = parser.parseArgs();

// récupérer le fichier config
const config = fs.readFileSync(path.join(__dirname, `/../${args.config}/config.yml`), "utf8");
console.log(path.dirname(args.config));

// enregistrer le tableau de keywords
const keywords = args.keywords.split(',');


/*
* RECUPERATION DE CONFIG.YML
*/
let config2;
try {
    config2 = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));
} catch (e) {
    console.log(e);
}

console.log(config2.default.api.twitter.consumerkey);
console.log(config2.default.api.twitter.consumersecret);
console.log(config2.default.api.twitter.accestoken);
console.log(config2.default.api.twitter.accesstokensecret);
console.log(config2.default.db.ip);
console.log(config2.default.db.port);
console.log(config2.default.db.db);


/*
 * RECUPERATION DES TWEETS
 */
const t = new Twitter({
    consumer_key: '7Ixba9BJWrGOxDjMYQCGKxVcR',
    consumer_secret: 'fKYsaGMz36b4odzpCPWKRlTTNRXoBcqpASSkQDSjztmF1oB3uI',
    token: '1269504528-DA42EtyEH1lkjmWr2MRXHLKfIqSOvW9ynmhvB8A',
    token_secret: 'rLGRcS09b5Vg2SL0vujJHurlOleIZm2ul6tRi87N9sqrp'
})

//regex test mail
const regEmail = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);

const mails = [];
t.on('tweet', function (tweet) {
    const text = tweet.text;
    const mailText = text.match(regEmail);
    if (mailText !== null){
        mails.push(mailText);
    }
    if(tweet.user.description !== null) {
        const description = tweet.user.description;
        const mailDescription = description.match(regEmail);
        if (mailDescription !== null) {
            mails.push(mailDescription);
        }
    }
})

t.on('error', function (err) {
    console.log('Oh no')
})

//changer ici le ou les termes recherchés
t.track('lepen')

