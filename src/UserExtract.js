import UserModel from './UserModel';
import Twitter from 'node-tweet-stream';

export default class UserExtract{
    constructor(ck, cs, t, ts, ip, port, db){
        //the hack degueulasse !!
        let that = this;

        this.user = new UserModel();

        this.t = new Twitter({
            consumer_key: ck,
            consumer_secret: cs,
            token: t,
            token_secret: ts
        });

        this.regEmail = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);
        // this.regEmail = new RegExp(/(?:(?:"[\w-\s]+")|(?:[\w-]+(?:\.[\w-]+)*)|(?:"[\w-\s]+")(?:[\w-]+(?:\.[\w-]+)*))(?:@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?::\.[a-z]{2})?))|(?:@\[?(?:(?:25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/g);
        // this.regEmail = new RegExp(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g);


        this.t.on('tweet', function (tweet) {
            const text = tweet.text;
            console.log('##################################');
            // console.log(`TEXT : ${text}`);
            const mailText = text.match(that.regEmail);
            console.log(`TEXT : ${text}`);
            console.log(`TEXTMAILARRAY : ${mailText}`);
            console.log(`TEXTMAIL : ${mailText}`);

            if (mailText !== null){
                console.log(`Created user : ${tweet.user.name}`);
                that.createUser(ip, port, db, tweet.user.name, mailText);
            }

            if(tweet.user.description !== null) {
                const description = tweet.user.description;
                console.log('##################################');
                // console.log(`DESCRIPTION : ${description}`);
                const mailDescription = description.match(that.regEmail);
                console.log(`DESCRIPTIONMAIL : ${mailDescription}`);
                if(mailDescription !== null) {
                    console.log(`Created user : ${tweet.user.name}`);
                    that.createUser(ip, port, db, tweet.user.name, mailDescription);
                }
            }
        });

        this.t.on('error', function (err) {
            console.log('Oh no')
        })

    }

    extract(keywords){
        keywords.forEach(keyword => {
            this.t.track(keyword);
        });
    }

    createUser(ip, port, db, username, email){

        this.user.connect(ip, port, db).then(response => {
            console.log('Connected');
            this.user.create(username, email);
            console.log('User created');
        }).catch(e => console.log(e));
    }
}