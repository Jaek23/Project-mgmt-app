const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String, 
    },
    status:{
        type:String,
        enum:['Not Started', 'In Progress', 'Completed'],
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId, //when adding a new record to the collection it is automatcially given a object ID 
        ref:'Client' // this is saying we want the object Id to reference a different model which is the client model when it is created 
    }
});

module.exports = mongoose.model('Project', ProjectSchema);