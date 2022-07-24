const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todolist');

const UserSchema = mongoose.Schema({
    username : String,
    password : String
},{collection: 'user'})

const UserModel = mongoose.model('user', UserSchema)



module.exports = UserModel