/*
 * PACKAGES
 */
// travailler sur des fichiers
import fs from 'fs';
// créer des arguments de commande perso
import ArgParseObj from 'argparse';
// lire des fichiers YAML
const yaml = require('js-yaml');
// ecrire du JSON directement en YAML
const writeData = require('write-data');
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
        this.initArgs();

        // enregistrer l'ensemble des arguments et leur valeur dans un objet args
        this.args = this._parser.parseArgs();
        // console.log(this.args);
        this._configPath = (path.join(__dirname, '/../config'));

        // récupérer le fichier sample et le fichier config à modifier
        this._configSampleFile = `${this._configPath}/config.sample.yml`;
        this._configFile = `${this._configPath}/config.yml`;

        // enregistrer le contenu du config.yml dans une variable (sous forme de string)
        this._configStructure = fs.readFileSync(this._configSampleFile, "utf8");
        if (!fs.existsSync(this._configFile) || _.isEmpty(yaml.safeLoad(fs.readFileSync(this._configFile, "utf8")))) {
            fs.writeFileSync(this._configFile, this._configStructure);
        }
        this._config = fs.readFileSync(this._configFile, "utf8");

    }

    setConfig() {
        // enregistrer le contenu du config.sample.yml dans une variable (sous forme de string)
        this._configStructure = fs.readFileSync(this._configSampleFile, "utf8");
        if (!fs.existsSync(this._configFile) || _.isEmpty(yaml.safeLoad(fs.readFileSync(this._configFile, "utf8")))) {
            fs.writeFileSync(this._configFile, this._configStructure);
        }

        // // lancer configuration complète
        // this.setConfigAll();
    }

    getConfig() {
        // extrait le config.yml en objet JS
        this.configYaml = yaml.safeLoad(fs.readFileSync(this._configFile, "utf8"))
        return this.configYaml;
    }

    initConfigFiles() {
        // si le fichier de config existe, le supprimer
        if (fs.existsSync(this._configFile)) {
            fs.unlinkSync(this._configFile);
        }
    }

    setConfigKey(el, string) {
        if (el === "consumerkey" || el === "consumersecret" || el === "token" || el === "tokensecret") {
            let change = this.getConfig().default.api.twitter[el]
            let data = this.getConfig()
            data.default.api.twitter[el] = string;
            writeData.sync(this._configFile, data)
            console.log(`${el}: ${change} a bien été modifié en ${el}: ${string}`);
        }
        if (el === "ip" || el === "port" || el === "db") {
            let change = this.getConfig().default.db[el];
            let data = this.getConfig()
            data.default.db[el] = string;
            writeData.sync(this._configFile, data)
            console.log(`${el}: ${change} a bien été modifié en ${el}: ${string}`);
        }
    }

    getConfigKey(el) {
        if (el === "consumerkey" || el === "consumersecret" || el === "token" || el === "tokensecret") {
            return this.getConfig().default.api.twitter[el];
        }
        if (el === "ip" || el === "port" || el === "db") {
            return this.getConfig().default.db[el];
            // return "test";
        }
    }

    setConfigAll() {
        this.initConfigFiles();
        // modifications de la variable du fichier config.sample.yml
        let configDone = this._configStructure
            .replace('CONSUMERKEY', this.args.consumerkey)
            .replace('CONSUMERSECRET', this.args.consumersecret)
            .replace('TOKEN', this.args.token)
            .replace('TOKENSECRET', this.args.tokensecret)
            .replace('IP', this.args.ip)
            .replace('PORT', this.args.port)
            .replace('DB', this.args.db);

        // enregistrement des modifications dans le fichier config.yml
        fs.appendFileSync(this._configFile, configDone);
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

        this._parser.addArgument(
            ['-k', '--keywords'], {
                help: 'Liste de mots à utiliser pour recherche flux twitter'
            }
        );

        this._parser.addArgument(
            ['-d', '--delay'], {
                help: 'temps d\'execution du script',
                defaultValue: 60000
            }
        );

    }
}