/*
 * PACKAGES
 */
import fs from 'fs';
import ArgParseObj from 'argparse';
import path from 'path';

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