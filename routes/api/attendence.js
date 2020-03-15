const express=require("express");
const router=express.Router();
const passport=require("passport");

const Attendance= require("../../models/attendance");

router.get("/test",(req,res)=>{
    res.json({msg:"attendance works"});
});

 router.post("/",
//  passport.authenticate("jwt",{session:false}),
passport.authenticate("jwt",{session:false}),
 (req,res)=>{
     const newAttendance={};
     newAttendance.student=req.body.student;
     newAttendance.present=req.body.present;
     newAttendance.date=req.body.date;
     newAttendance.hour=req.body.hour;

     Attendance.findOne({student:req.body.student})
     .then(attendance =>{
         new Attendance(newAttendance)
         .save()
         .then(order =>res.json(attendance))
         .catch(err =>res.json(err));
     })
     .catch(err =>res.json(err));

 }
 );


 router.get("/",
 passport.authenticate("jwt",{session:false}),
 (req,res)=>{
     Attendance.find({student:req.body.student})
     .populate("student")
     .then(attendance =>{
         if(!attendance){
             res.status(404).json("no attendendance is works");
         }
         res.json(attendance)
     })
     .catch(err =>{
         res.json(err);
     });
 }
 );
 module.exports=router;
 
