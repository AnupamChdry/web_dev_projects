const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/bmiCalculator.html")
})


app.post("/", function(req,res){
    // console.log(req.body);
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var result = weight/height*height;
    res.send("Your BMI is " + result);
})

app.listen(3000,function(){
    console.log('Server has been started at port 3000');
})