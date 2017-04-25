/*
 * PACKAGES
 */
// travailler sur des fichiers
import fs from 'fs';
// créer des arguments de commande perso
import ArgParseObj from 'argparse';
// exploiter des fichiers YAML
const yaml = require('js-yaml');

/*
 * ARGUMENTS COMMANDES
 */

// ajouter des arguments à des commandes
const ArgParse = ArgParseObj.ArgumentParser;

// créer un nouvel objet ArgParse
const parser = new ArgParse({
    version: '0.0.1',
    addHelp: true,
    description: 'config.yml parser'
});

// Liste des arguments a créer

// parser.addArgument(
//     ['-a', '--api'], {
//         help: 'API a utiliser (twitter)'
//     }
// );

parser.addArgument(
    ['-ck', '--consumerkey'], {
        help: 'Twitter Customer Key'
    }
);

parser.addArgument(
    ['-cs', '--consumersecret'], {
        help: 'Twitter Customer secret key'
    }
);

parser.addArgument(
    ['-t', '--token'], {
        help: 'Twitter Token'
    }
);

parser.addArgument(
    ['-ts', '--tokensecret'], {
        help: 'Twitter Token secret'
    }
);

parser.addArgument(
    '--ip', {
        help: 'IP de la base de données'
    }
);

parser.addArgument(
    ['-p', '--port'], {
        help: 'Port de la base de données'
    }
);

parser.addArgument(
    '--db', {
        help: 'Nom de la base de données'
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

// récupérer le fichier sample et le fichier config à modifier
let configSample = `.${args.config}/config.sample.yml`;
let config = `.${args.config}/config.yml`;

// si le fichier de config existe, le supprimer
if (fs.existsSync(config)) {
    fs.unlinkSync(config);
}

// enregistrer le contenu du sample dans une variable (sous forme de string)
let configStructure = fs.readFileSync(configSample, "utf8");

// modifications de la variable du fichier config.sample.yml
let configDone = configStructure
    .replace('CONSUMERKEY', args.consumerkey)
    .replace('CONSUMERSECRET', args.consumersecret)
    .replace('TOKEN', args.token)
    .replace('TOKENSECRET', args.tokensecret)
    .replace('IP', args.ip)
    .replace('PORT', args.port)
    .replace('DB', args.db);

// enregistrement des modifications dans le fichier config.yml
fs.appendFileSync(config, configDone);