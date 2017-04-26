/*
 *PACKAGES
 */
import userExtract from './UserExtract';
import Config from './Config';

/*parser.addArgument(
    ['-d', '--delay'], {
        help: 'temps d\'execution du script',
        defaultValue: 60000
    }
);
*/

// récupérer le fichier config
const configClass = new Config();
const config = configClass.getConfig();

// recuperation des keywords le tableau de keywords
const keywords = configClass.args.keywords.split(',');


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

