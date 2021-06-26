const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema( {
  description: {
   type: String,
   required: true,
   trim : true
 },
 status: {
   type: Boolean,
   default: false,
 },
 owner : {
   type : String,
   required : true,
   ref : "User"
 }
},  {
  timestamps : true
})

const Task = mongoose.model("Tasks",taskSchema);

module.exports = Task
