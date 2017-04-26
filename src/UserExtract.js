import UserModel from './UserModel';
import Twitter from 'node-tweet-stream';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default class UserExtract{
    constructor(ck, cs, t, ts, ip, port, db, delay){
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
            //verification si la connection est active (un peu overkill)
            if(mongoose.connection._readyState === 1){
                const text = tweet.text;
                let mailText = text.match(this.regEmail);

                if (mailText !== null){
                    mailText = String(mailText);
                    mailText = mailText.toLowerCase();
                    console.log(`Create user : ${tweet.user.name}  (from tweet)`);
                    console.log(`Email : ${mailText}`);
                    this.createUser(tweet.user.name, mailText);
                }

                if(tweet.user.description !== null) {
                    const description = tweet.user.description;
                    let mailDescription = description.match(this.regEmail);

                    if(mailDescription !== null) {
                        mailDescription = String(mailDescription);
                        mailDescription = mailDescription.toLowerCase();
                        console.log(`Create user : ${tweet.user.name}  (from description)`);
                        console.log(`Email : ${mailDescription}`);
                        this.createUser(tweet.user.name, mailDescription);
                    }
                }
            } else {
                console.log("not connected");
            }
        });


        this.t.on('error', err => {
            console.log('Oh no')
        })

        //arret du script apres le delay
        this.delayInSeconds = delay/1000;
        setTimeout(() => {
            process.exit(`after timeout (${this.delayInSeconds} seconds)`);
        }, delay);


        //arret du script avec ctrl-C
        process.on('SIGINT', () => {
            process.exit('on demand');
        })

        process.on('exit', code => {
            mongoose.connection.close();
            console.log(`#####Connection closed : ${code} #####`);
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
        this.user.UMCreate(username, email);
    }
}