const mongoose = require('mongoose');
const Task = require('./task-model')

const ProjectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description :{
        type :String,
        required : true
    },
    status : {
        type : String,
        default : 'Todo',
        enum : ['Todo','Pending','Completed']
    },
    progress : {
        type : Number,
        default : 0
    },
    tasks : [{
        taskId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Task'
        }
    }],
    createdAt : {
        type : Date,
        default : Date.now
    }
    
});

ProjectSchema.methods.calculateProgress = async function(){
    if(this.tasks.length === 0 ) return 0;
    const taskIds = this.tasks.map(task => task.taskId);
    const tasks = await Task.find({'_id' : {$in : taskIds}});
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const progress = (completedTasks / this.tasks.length) * 100;
    return progress;
}
const Project = mongoose.model('Project',ProjectSchema);
module.exports = Project;