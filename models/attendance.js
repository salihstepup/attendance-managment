const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const AttendanceSchema= new Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:"studentdetails" //same of student in model
    },
    present:{
        type:Boolean,
   default:false
    },
    date:{
        type:Date
    },
    hour:{
        type:String
    }
   
})
module.exports= Attendance=mongoose.model("attendance",AttendanceSchema);