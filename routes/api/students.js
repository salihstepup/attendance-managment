const express=require('express');
const router=express.Router();
const passport =require("passport");

const Student= require("../../models/student");


router.get("/test",(req,res)=> {
    res.json({msg:"student works"});

});

router.post("/",
passport.authenticate("jwt",{session:false}),
(req,res)=> {
    const newStudent={};
    newStudent.class=req.body.class;
    newStudent.rollnumber=req.body.rollnumber;
    newStudent.Name=req.body.Name;//model name aytt same avannm



    Student.findOne({class:req.body.class})
    .then(student =>{
        new Student(newStudent)
        .save()
        .then(student =>res.json(student))
        .catch(err => res.json(err));
    })
      .catch(err => res.json(err));

}


);
router.get("/",
// passport.authenticate("jwt",{sesssion:false}),
passport.authenticate("jwt",{session:false}),

(req,res)=>{
    Student.find({class:req.body.class})
    .populate("class") //clsss le detailss okke indavum
    .then(student =>{
        if(!student){
            res.status(404).json("no student found");
        }
        res.json(student)
    })
    .catch(err =>{
        res.json(err);
    });
}


);
module.exports=router;
