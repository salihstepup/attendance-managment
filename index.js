const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const passport=require("passport");

const users=require("./routes/api/users");//new router indakumbol mainl import cheyyanam
const students=require("./routes/api/students");
const clas=require("./routes/api/class");
const attendance=require("./routes/api/attendence");


const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const db = require("./config/keys").mongoURI;

mongoose
.connect("mongodb+srv://salih:salihstepup@cluster0-kdjz1.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser:true ,
        useUnifiedTopology:true
     }
    )
.then(()=>console.log("Mongo db connected"))
.catch(err => console.log(err));

mongoose.Promise =global.Promise;

app.use(passport.initialize());
require("./config/passport")(passport);


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Orgin","*"); // to avoid cors error
    res.header(
        "Access-Control-Allow-Headers",
        "Orgin,X-Requested-With,Content-Type,Accept,Authorization"

    );
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }
    next();
});

app.use("/api/users/",users)// all tym  routes ithil import chyyanm ynnale postmanl wrok cheyyu
app.use("/api/students",students)
app.use("/api/class",clas)
app.use("/api/attendence",attendance)



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Running on port ${port}`));

