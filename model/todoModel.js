const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todolist');

const TodoSchema = mongoose.Schema({
    name : String,
    deadline : Date,
    status : String,
    userID : String,
},{collection: 'todo'})

const TodoModel = mongoose.model('todo', TodoSchema)





module.exports = TodoModel