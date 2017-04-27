import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {type : String , unique : true},
    pass: String
});
module.exports = mongoose.model('AppUser', userSchema);  
