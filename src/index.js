/*
 *PACKAGES
 */
//recuperer un flux twitter
const Twitter = require('node-tweet-stream')
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


/*
 * RECUPERATION DES TWEETS
 */
const t = new Twitter({
    consumer_key: '7Ixba9BJWrGOxDjMYQCGKxVcR',
    consumer_secret: 'fKYsaGMz36b4odzpCPWKRlTTNRXoBcqpASSkQDSjztmF1oB3uI',
    token: '1269504528-DA42EtyEH1lkjmWr2MRXHLKfIqSOvW9ynmhvB8A',
    token_secret: 'rLGRcS09b5Vg2SL0vujJHurlOleIZm2ul6tRi87N9sqrp'
})

//regex test mail
const regEmail = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);

const mails = [];
t.on('tweet', function (tweet) {
    const text = tweet.text;
    const mailText = text.match(regEmail);
    if (mailText !== null){
        mails.push(mailText);
    }
    if(tweet.user.description !== null) {
        const description = tweet.user.description;
        const mailDescription = description.match(regEmail);
        if (mailDescription !== null) {
            mails.push(mailDescription);
        }
    }
})

t.on('error', function (err) {
    console.log('Oh no')
})

//changer ici le ou les termes recherchés
t.track('lepen')


