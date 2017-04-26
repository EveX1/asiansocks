import mongoose from 'mongoose';

export default class UserModel {
    constructor(){
        this.user = mongoose.model('User', {
            username : String,
            email: {type : String , unique : true}
        });
    }


    UMCreate(username, email){
        this.user.create({
            username: username,
            email: email
        })
        .then(() => {
            console.log('User created');
        })
        .catch(err => console.log(`Error : ${err.message}`))
        ;
    }
}
