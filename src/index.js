import fs from 'fs';
import ArgParseObj from 'argparse';

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
        help: 'Fichier de configuration pour API Twitter'
    }
);


const config = "./config/";

const args = parser.parseArgs();

fs.readFileSync(`${config}${args.config}`, "utf8");