/*
 * PACKAGES
 */
// travailler sur des fichiers
import fs from 'fs';
// créer des arguments de commande perso
import ArgParseObj from 'argparse';
// exploiter des fichiers YAML
const yaml = require('js-yaml');

const ArgParse = ArgParseObj.ArgumentParser;

const parser = new ArgParse({
    version: '0.0.1',
    addHelp: true,
    description: 'config.yml parser'
});

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

const args = parser.parseArgs();

let configSample = `.${args.config}/config.sample.yml`;
let config = `.${args.config}/config.yml`;

if (fs.existsSync(config)) {
    fs.unlinkSync(config);
}

configStructure = fs.readFileSync(configSample, "utf8");
fs.appendFileSync(config, configStructure)


console.log(args)