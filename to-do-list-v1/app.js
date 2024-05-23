const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.get("/",function(req,res){
    // res.send("thankyou for your input");

    var today = new Date();

    if(today.getDay() === 6 || today.getDay() === 0){
        res.send("<h1>Yay! It's a weekend</h1>");
    }
    else{
        res.send("<h1>Shit! I have to work</h1>");
    }
})



app.listen(3000,function(req,res){
    console.log("server has been started at port 3000");
})