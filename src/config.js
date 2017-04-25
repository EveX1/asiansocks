/*
 * PACKAGES
 */
// travailler sur des fichiers
import fs from 'fs';
// créer des arguments de commande perso
import ArgParseObj from 'argparse';
// exploiter des fichiers YAML
const yaml = require('js-yaml');
import path from 'path';
// ajouter des arguments à des commandes
const ArgParse = ArgParseObj.ArgumentParser;

/*
 * CLASS COMMANDES
 */

export default class Config {
    constructor() {

        // créer un nouvel objet ArgParse
        this._parser = new ArgParse({
            version: '0.0.1',
            addHelp: true,
            description: 'config.yml parser'
        });

        // lancer la création des arguments
        this.initArgs();

        // enregistrer l'ensemble des arguments et leur valeur dans un objet args
        this._args = this._parser.parseArgs();

        // récupérer le fichier sample et le fichier config à modifier
        this._configSample = `.${this._args.config}/config.sample.yml`;
        this._config = `.${this._args.config}/config.yml`;

        // lancer la RAZ du config.yml
        this.initConfigFiles();

        // enregistrer le contenu du sample dans une variable (sous forme de string)
        this._configStructure = fs.readFileSync(this._configSample, "utf8");

        // lancer configuration complète
        this.setConfigAll()

        // extrait le config.yml en objet JS
        this._configYaml = yaml.safeLoad(fs.readFileSync(this._config, "utf8"))

        // console.log(this._configYaml);

        // this.getConfigApi('consumerkey');
        // this.getConfigDb('ip');
        // this.setConfigApi('token', 'boloss');
        // this.getConfigApi('token');
    }

    initConfigFiles() {
        // si le fichier de config existe, le supprimer
        if (fs.existsSync(this._config)) {
            fs.unlinkSync(this._config);
        }
    }

    setConfigApi(el, string) {
        let change = this.getConfigApi(el)
        let configDone = this._configStructure.replace(change, string)
        fs.appendFileSync(this._config, configDone);
    }

    getConfigApi(el) {
        console.log(this._configYaml.default.api.twitter[el]);
        return this._configYaml.default.api.twitter[el];
    }

    setConfigDb(el) {
        this._configStructure.replace(el.toUpperCase(), this._args.ip)
    }

    getConfigDb(el) {
        console.log(this._configYaml.default.db[el])
        return this._configYaml.default.db[el]
    }

    setConfigAll() {
        // modifications de la variable du fichier config.sample.yml
        let configDone = this._configStructure
            .replace('CONSUMERKEY', this._args.consumerkey)
            .replace('CONSUMERSECRET', this._args.consumersecret)
            .replace('TOKEN', this._args.token)
            .replace('TOKENSECRET', this._args.tokensecret)
            .replace('IP', this._args.ip)
            .replace('PORT', this._args.port)
            .replace('DB', this._args.db);

        // enregistrement des modifications dans le fichier config.yml
        fs.appendFileSync(this._config, configDone);
    }

    // Liste des arguments a créer
    initArgs() {
        // this._parser.addArgument(
        //     ['-a', '--api'], {
        //         help: 'API a utiliser (twitter)'
        //     }
        // );

        this._parser.addArgument(
            ['-ck', '--consumerkey'], {
                help: 'Twitter Customer Key'
            }
        );

        this._parser.addArgument(
            ['-cs', '--consumersecret'], {
                help: 'Twitter Customer secret key'
            }
        );

        this._parser.addArgument(
            ['-t', '--token'], {
                help: 'Twitter Token'
            }
        );

        this._parser.addArgument(
            ['-ts', '--tokensecret'], {
                help: 'Twitter Token secret'
            }
        );

        this._parser.addArgument(
            '--ip', {
                help: 'IP de la base de données'
            }
        );

        this._parser.addArgument(
            ['-p', '--port'], {
                help: 'Port de la base de données'
            }
        );

        this._parser.addArgument(
            '--db', {
                help: 'Nom de la base de données'
            }
        );

        this._parser.addArgument(
            ['-c', '--config'], {
                help: 'Chemin du fichier de configuration pour API Twitter',
                defaultValue: "/config"
            }
        );
    }
}