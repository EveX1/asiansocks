import mongoose from 'mongoose';

export default class UserModel {
    constructor(){
        this.user = mongoose.model('User', {
            username : String,
            email: String
        });
    }


    create(username, email){
        this.user.create({
            username: username,
            email: email
        });
    }
}
