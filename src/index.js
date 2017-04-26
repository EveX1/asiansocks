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
const config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, `/../${args.config}/config.yml`), "utf8"));


// enregistrer le tableau de keywords
const keywords = args.keywords.split(',');


/*
 * RECUPERATION DES TWEETS
 */
const t = new Twitter({
    consumer_key: config.default.api.twitter.consumerkey,
    consumer_secret: config.default.api.twitter.consumersecret,
    token: config.default.api.twitter.token,
    token_secret: config.default.api.twitter.tokensecret
})

//regex test mail
const regEmail = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);

//pour le moment on enregistre les mails dans le tableau mails[]
const mails = [];
t.on('tweet', function(tweet) {
    const text = tweet.text;
    const mailText = text.match(regEmail);
    if (mailText !== null) {
        mails.push(mailText);
        console.log(mails);
    }
    if (tweet.user.description !== null) {
        const description = tweet.user.description;
        const mailDescription = description.match(regEmail);
        if (mailDescription !== null) {
            mails.push(mailDescription);
            console.log(mails);
        }
    }
})

t.on('error', function(err) {
    console.log('Oh no')
})

//changer ici le ou les termes recherchés
keywords.forEach(keyword => {
    t.track(keyword);
});