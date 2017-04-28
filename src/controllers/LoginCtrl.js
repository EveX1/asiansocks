import _ from 'underscore';
import mongoose from 'mongoose';
import encrypt from 'bcrypt';
mongoose.Promise = global.Promise;
import AppUser from '../AppUser';

export default class LoginCtrl {
    constructor(title){
        this.title = title;
    }

    index(req, res){
        console.log(this);
        let msg = "";
        if (!_.isEmpty(req.param("msg"))) {
            msg = req.param("msg");
        }
        res.render('login', {
        title: `${this.title} - login`,
        msg: msg
        });
    }


    form(req, res){
        if (mongoose.connection._readyState === 1) {
            const user = new AppUser();
            user.connectz(req.body.pseudo, req.body.pass)
                .then(user => {
                    console.log(`find user : ${user.username}`)
                    //password verification
                    encrypt.compare(req.body.pass, user.pass, (err, resp) => {
                        if (resp) {
                            console.log(`user connected`)
                            //save session
                            req.session.connected = true;
                            req.session.pseudo = req.body.pseudo;
                            res.redirect('/config');
                        } else {
                            console.log(`wrong pass`)
                            res.redirect('/login?msg=e');
                        }
                    });
                })
                .catch(e => {
                    console.log(`no user found ${e}`)
                    res.redirect('/login?msg=e');
                })
            ;
        }
    }

}
