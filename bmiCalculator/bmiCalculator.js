const express = require("express");
const bodyParser = require("body-parser");  
const app = express();  

app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
    res.sendFile(__dirname + '/bmiCalculator');
});
app.post("/",function(req,res){
    
    res.send("Calculated output is equal to " + (Number(req.body.Weight)/(Number(req.body.Height))*(Number(req.body.Height))));
});
app.listen(3000,function(){
    console.log("server has been started at port 3000");
});