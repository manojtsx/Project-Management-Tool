const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'Todo',
        enum : ['Todo','Pending','Completed']
    },
    deadline : {
        type : Date,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const Task= mongoose.model('Task',TaskSchema);
module.exports = Task;
