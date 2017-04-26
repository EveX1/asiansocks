/*
 *PACKAGES
 */
//recuperer un flux twitter
import Twitter from 'node-tweet-stream';
import Config from './Config';

// récupérer le fichier config
const configClass = new Config();
const config = configClass.getConfig();

// recuperation des keywords le tableau de keywords
const keywords = configClass.args.keywords.split(',');


/*
 * RECUPERATION DES TWEETS
 */
const t = new Twitter({
    consumer_key: config.default.api.twitter.consumerkey,
    consumer_secret: config.default.api.twitter.consumersecret,
    token: config.default.api.twitter.token,
    token_secret: config.default.api.twitter.tokensecret
})

//regex test mail
const regEmail = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);

//pour le moment on enregistre les mails dans le tableau mails[]
const mails = [];
t.on('tweet', function(tweet) {
    const text = tweet.text;
    const mailText = text.match(regEmail);
    if (mailText !== null) {
        mails.push(mailText);
        console.log(mails);
    }
    if (tweet.user.description !== null) {
        const description = tweet.user.description;
        const mailDescription = description.match(regEmail);
        if (mailDescription !== null) {
            mails.push(mailDescription);
            console.log(mails);
        }
    }
})

t.on('error', function(err) {
    console.log('Oh no')
})

//changer ici le ou les termes recherchés
keywords.forEach(keyword => {
    t.track(keyword);
});