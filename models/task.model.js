const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    priority:{
        type:String,
        enum:["High", "Medium", "Low"],
        default: "Medium"
    },
    dueDate:{
        type: Date,
    }
})

const task = mongoose.model('task', TaskSchema);
module.exports = task