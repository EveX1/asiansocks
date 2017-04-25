import UserModel from './UserModel';
import Twitter from 'node-tweet-stream';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

export default class UserExtract{
    constructor(ck, cs, t, ts, ip, port, db){
        //the hack degueulasse !!
        let that = this;

        //connection
        this.connect(ip, port, db).then(response => {
            console.log('#####Connected#####');
        }).catch(e => console.log(e));

        //model user
        this.user = new UserModel();

        //twitter
        this.t = new Twitter({
            consumer_key: ck,
            consumer_secret: cs,
            token: t,
            token_secret: ts
        });

        //regex mail
        this.regEmail = new RegExp(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/gi);

        this.t.on('tweet', tweet => {
            const text = tweet.text;

            const mailText = text.match(this.regEmail);


            if (mailText !== null){
                console.log(`Create user (text) : ${tweet.user.name}`);
                this.createUser(tweet.user.name, mailText);
            }

            if(tweet.user.description !== null) {
                const description = tweet.user.description;
                const mailDescription = description.match(this.regEmail);

                if(mailDescription !== null) {
                    console.log(`Create user (desc) : ${tweet.user.name}`);
                    this.createUser(tweet.user.name, mailDescription);
                }
            }
        });

        this.t.on('error', err => {
            console.log('Oh no')
        })

        //arret du script au bout de 50 secondes avec deconnection de la bdd
        setTimeout(() => {
            process.exit();
        }, 50000);

        process.on('exit', () => {
            mongoose.connection.close();
            console.log('#####Connection closed#####');
        })

    }

    connect(ip, port, db){
        return new Promise((resolve, reject) => {
            mongoose.connect(`mongodb://${ip}:${port}/${db}`, err => {
                if(err){reject(err); return}
                resolve(true);
            })
        })

    }

    extract(keywords){
        keywords.forEach(keyword => {
            this.t.track(keyword);
        });
    }

    createUser(username, email){
            this.user.create(username, email);
            console.log('User created');
    }
}
