const express =require('express');
const router = express.Router(); //ith ingne ann
const keys= require("../../config/keys");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const passport=require("passport");
const validator=require("validator")
const User =require("../../models/users"); // users can be dffrnt name


router.get("/test",(req,res)=>{ // becoz  not write any thing just testing here
    res.json({ msg:"users works"});
});


router.post("/register",(req,res) => { //sign up
    User.findOne({ email:req.body.email}) //ithinte usersum
    .then(user => { //user doubt nd user oru name matram it can be chnge
        if (user){
            return res.status(400).json("email is already exist");//becoz it is unique

        }else{
            const newUser=new User({ //doubt in newuser and user new user can be any bname anfd users must be put in models
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password

            });
            bcrypt.genSalt(10,(err,salt)=> {
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err)throw err;
                    newUser.password=hash;
                    newUser
                    .save()
                    .then(user => res.json(user)) //should be any name
                    .catch(err =>console.log(err));
                });
            });
        }
    })
    .catch(err => console.log(err));
});

router.post("/login",(req,res)=>{ //login
    const email=req.body.email;
    const password=req.body.password;
    if (!validator.isEmail(email)) {
        res.json({msg:"Invalid email"})
      }
    User.findOne({email}).then(user =>{
        if(!user){
            return res.status(404).json("user not found");
        }else{
            bcrypt.compare(password,user.password).then(isMatch => {
                if(isMatch){
                    const payload = {
                        id:user.id,
                        name:user.name,
                        email :user.email,
                    };
                    jwt.sign(
                        payload, //it is a xdata this token decoded into specific id,it used take token into passport,that token decoded is jwt payload
                        keys.secretOrKey,
                        {expiresIn:3600},
                        (err,token)=>{
                            res.json({
                                success:true,
                                token:"Bearer "+ token
                            });
                        }
                    );
                }else{
                    res.status(400).json("password is not match"); //it is impt not addx in front end others can be add

                }

            });
        }
    });
});

router.get(
    "/current", //current vcha ynthann
    passport.authenticate("jwt",{ session:false}), // why put false session means
    (req,res)=>{
        res.json({
            id:req.user.id,
            name:req.user.name, // ith yth user aan?
            email:req.user.email,
            password:req.user.password
        });
    }
);

module.exports = router;