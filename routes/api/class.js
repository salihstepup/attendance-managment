const express=require("express");
const router =express.Router();
const passport = require("passport");

const Class = require("../../models/class");

router.get("/test",(req,res)=>{ // for testing
    res.json({ msg:"class is works"});
});


router.post(
    "/",
    passport.authenticate("jwt",{session:false}),
    (req,res)=>{
        const newClass = {};//put close close bracket and why we dont put any thng after slash?ee stringl ann details okke add aakunnath
        newClass.teacher=req.user.id; //ithil user nthann must aano? yes must itjil login chythe aalde idye kittu baaki angne alla
        newClass.department=req.body.department;//ithil deptmnt any name aavo or models nme aaano ?same avanam
        newClass.year=req.body.year;
        newClass.division=req.body.division;
        newClass.subject=req.body.subject;
        
        Class.findOne({ teacher:req.user.id})//ee user nthelum name pattuo?nop 
        .then(clas => { // ithil neworder ndina classobject concept
            new Class(newClass) //or use before model in user.js
            .save()
            .then(clas =>res.json(clas))// ith nda sambavam clas name ndelum avo class nde pattathe some it will a keyword so not use it
            .catch(err => res.json(err));//ithum

        })
        // .catch(err => res.json(err));

    }
);

router.get( //y get use  there are two api for display and add
    "/",
    passport.authenticate("jwt",{session:false}),//check login ayal matram nadjkaan
    (req,res) =>{
        Class.find({teacher:req.user.id}) // oro teavcher id matram kityy user id ninnpinne chyya teachernte ylla class kittan
        .populate("teacher") //y populate use if itis compulsory?not compulsory if use populate we get teacher details otherwise we get id only
        .then(clas => {
            if(!clas){
                res.status(404).json("no class found");
            }
            res.json(clas);
        })
        .catch(err => {
            console.log(err)
            res.json(err);
        });
    }
    );


module.exports=router;