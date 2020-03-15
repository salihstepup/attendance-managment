const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const ClassSchema=new Schema({
 teacher:{
     type:Schema.Types.ObjectId,
     ref:"usersdetails"
 },
  department:{
    type:String,
    required:true
},
year:{
    type:Number,
    required:true
},
division:{
    type:String,
    required:true
},
subject:{
    type:String,
    required:true
},
});

module.exports = Class = mongoose.model('classes',ClassSchema);