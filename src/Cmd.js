import Config from './Config'
import userExtract from './UserExtract';

export default class Cmd {
    constructor(){
        //get configuration
        this.configClass = new Config();
        this.config = this.configClass.getConfig();

        //get keywords
        this.keywords = this.configClass.args.keywords.split(',');

        //instance userExtract
        this.userextract = new userExtract(
            this.config.default.api.twitter.consumerkey,
            this.config.default.api.twitter.consumersecret,
            this.config.default.api.twitter.token,
            this.config.default.api.twitter.tokensecret,
            this.config.default.db.ip,
            this.config.default.db.port,
            this.config.default.db.db,
            this.configClass.args.delay
        );
    }
    extract(){
        this.userextract.extract(this.keywords);
    }
}