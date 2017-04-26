/*
 *PACKAGES
 */
import userExtract from './UserExtract';
import Config from './Config';

// récupérer le fichier config
const configClass = new Config();
const config = configClass.getConfig();

// recuperation des keywords le tableau de keywords
const keywords = configClass.args.keywords.split(',');


//recuperation des tweets
const userextract = new userExtract(
    config.default.api.twitter.consumerkey,
    config.default.api.twitter.consumersecret,
    config.default.api.twitter.token,
    config.default.api.twitter.tokensecret,
    config.default.db.ip,
    config.default.db.port,
    config.default.db.db,
    configClass.args.delay
);

userextract.extract(keywords);

console.log('Coucou');