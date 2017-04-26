/*
 * PACKAGES
 */
// travailler sur des fichiers
import fs from 'fs';
// créer des arguments de commande perso
import ArgParseObj from 'argparse';
// exploiter des fichiers YAML
const yaml = require('js-yaml');
// bibliothèque de fonctions utiles en JS
import _ from 'underscore';
// package de gestion des chemins
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
        this._initArgs();

        // enregistrer l'ensemble des arguments et leur valeur dans un objet args
        this._args = this._parser.parseArgs();
        // console.log(this._args);

        // récupérer le fichier sample et le fichier config à modifier
        this._configSampleFile = `.${this._args.config}/config.sample.yml`;
        this._configFile = `.${this._args.config}/config.yml`;
        // enregistrer le contenu du config.sample.yml dans une variable (sous forme de string)
        this._configStructure = fs.readFileSync(this._configSampleFile, "utf8");
        if (!fs.existsSync(this._configFile) || _.isEmpty(yaml.safeLoad(fs.readFileSync(this._configFile, "utf8")))) {
            fs.writeFileSync(this._configFile, this._configStructure);
        }
        // enregistrer le contenu du config.yml dans une variable (sous forme de string)
        this._config = fs.readFileSync(this._configFile, "utf8");

        // lancer la RAZ du config.yml
        // this.initConfigFiles();

        // lancer configuration complète
        this.setConfigAll();

        // extrait le config.yml en objet JS
        this._configYaml = yaml.safeLoad(fs.readFileSync(this._configFile, "utf8"))

        // this.setConfigDb('db', 'asiansock2');
    }

    initConfigFiles() {
        // si le fichier de config existe, le supprimer
        if (fs.existsSync(this._configFile)) {
            fs.unlinkSync(this._configFile);
        }
    }

    setConfigApi(el, string) {
        let change = this.getConfigApi(el);
        let configDone = this._config.replace(change, string);
        this.initConfigFiles();
        fs.appendFileSync(this._configFile, configDone);
    }

    getConfigApi(el) {
        return this._configYaml.default.api.twitter[el];
    }

    setConfigDb(el, string) {
        let change = this.getConfigDb(el);
        let configDone = this._config.replace(change, string);
        this.initConfigFiles();
        fs.appendFileSync(this._configFile, configDone);
    }

    getConfigDb(el) {
        return this._configYaml.default.db[el]
    }

    setConfigAll() {
        this.initConfigFiles();
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
        fs.appendFileSync(this._configFile, configDone);
    }

    // Liste des arguments a créer
    _initArgs() {
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