import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

export default class UserModel {
    constructor(){
        this.user = mongoose.model('User', {
            username : String,
            email: String
        });
    }


    connect(ip, port, db){
        return new Promise((resolve, reject) => {
            mongoose.connect(`mongodb://${ip}:${port}/${db}`, err => {
                if(err){reject(err); return}
                resolve(true);
            })
        })

    }

    create(username, email){
        this.user.create({
            username: username,
            email: email
        });
    }
}

//connection
const user = new UserModel();

user.connect('162.243.195.173', '27017', 'asiansocks').then(response => {
    console.log('Connected');
    user.create('bubu', 'bubu@bobo.com');


}).catch(e => console.log(e));