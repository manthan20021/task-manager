const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true
    },
    phone:{
        type: Number
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type: String,
        require:true
    }
});



const user = mongoose.model('user', UserSchema);
module.exports = user;