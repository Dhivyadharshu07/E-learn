const express=require("express");
const mysql=require("mysql");
const doenv=require("dotenv");
const path=require("path");
const hbs=require("hbs");
const cookieParser = require("cookie-parser");
const nodemailer = require('nodemailer');
//const userController=require("../controllers/users");
const app=express();

doenv.config({
    path:"./.env",
});
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,
   
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Mysql connection success");
    }
});

app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
//app.use(express.json());
//console.log(__dirname);
const location=path.join(__dirname,"./public");
app.use(express.static(location));
app.set("view engine","hbs")


 app.use("/auth", require("./routes/auth")); 

 app.use('/',require('./routes/pages'));          

app.listen(700, () => {
    console.log("Server started @ Port 700");

});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ceg.success.2023@gmail.com',
      pass: 'yyegdudvjpsrchmj'
    }
  });
  
  const mailOptions = {
    from: from,
    to: 'ceg.success.2023@gmail.com' ,
    text:message,
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
        console.log("email send:"+info.response)
    }
    response.redirect('/Feedback')
  });
  app.get('/feedback',(request,response)=>{
    response.send('<h1>Message sent</h1>');
  })