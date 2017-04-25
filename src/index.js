/*
 *PACKAGES
 */

//lire et ecrure dansun fichier
import fs from 'fs';
import ArgParseObj from 'argparse';
import path from 'path';
import userExtract from './UserExtract';
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

parser.addArgument(
    ['-d', '--delay'], {
        help: 'temps d\'execution du script',
        defaultValue: 60000
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
const userextract = new userExtract(
    config.default.api.twitter.consumerkey,
    config.default.api.twitter.consumersecret,
    config.default.api.twitter.token,
    config.default.api.twitter.tokensecret,
    config.default.db.ip,
    config.default.db.port,
    config.default.db.db,
    args.delay
);

userextract.extract(keywords);
