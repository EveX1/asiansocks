/*
*PACKAGES
*/
//lire les infos d'un fichier yml
const yaml = require('js-yaml');
//lire et ecrure dansun fichier
const fs   = require('fs');



/*
* RECUPERATION DE CONFIG.YML
*/
let config;
try {
    config = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8'));
} catch (e) {
    console.log(e);
}
console.log(config.default.api.twitter.consumerkey);
console.log(config.default.api.twitter.consumersecret);
console.log(config.default.api.twitter.accestoken);
console.log(config.default.api.twitter.accesstokensecret);
console.log(config.default.db.ip);
console.log(config.default.db.port);
console.log(config.default.db.db);