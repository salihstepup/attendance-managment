const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const studentSchema=new Schema({
    class:{
        type:Schema.Types.ObjectId,
        ref:"classes"
    },
    
   
    rollnumber:{
        type:Number,
        required:true
    },
    Name:{
        type:String,
        required:true
    }


});

module.exports=student=mongoose.model("studentdetails",studentSchema);