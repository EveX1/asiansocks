import mongoose from 'mongoose';
import AppUserSchema from './AppUserSchema';

export default class AppUser {
    // constructor(){
    //     this.appUser = mongoose.model('AppUser', {
    //         username : {type : String , unique : true},
    //         pass: String
    //     });
    // }

    registerInDb(username, pass){
        AppUserSchema.create({
            username: username,
            pass: pass
        })
            .then(() => {
                console.log('Utilisateur créé');
            })
            .catch(err => console.log(`Error : ${err.message}`))
        ;
    }

    connectz(pseudo, pass){
        const prom = new Promise((resolve, reject) => {
            AppUserSchema.findOne({
                username: pseudo
            })
                .then(user => resolve(user))
                .catch(e => reject(e))
        });
        return prom;
    }
}
