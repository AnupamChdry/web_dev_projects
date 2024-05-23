const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})


app.post("/",function(req,res){
    // console.log(req.body);
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
            email_address: email,
            status : "subscribed",
            merge_fields:{
                FNAME: fName,
                LNAME: lName
            }
            }
        ]
    }

    var jsonData = JSON.stringify(data);


    var url = "https://us22.api.mailchimp.com/3.0/lists/55e3973262";

    var options ={
        method:"POST",
        auth:"Anupam:04f81ebae70775dfd5b3d6d555a6fd91-us22"
    }
    const request = https.request(url,options,function(response){
        // console.log(response.statusCode);

        if(response.statusCode === 200){
            // res.send("success");
            res.sendFile(__dirname + "/success.html");
        }
        else{
            // res.send("Failure");
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })  

    request.write(jsonData);
    request.end();


    // res.send("Thank you for your response!");
    // console.log(fName + lName + email);
})

app.post('/failure',function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server has been started at port 3000");
})








//appkey
// c4271b85b580efc2d6e7fce611bfee27-us22
// 5134547cc29eeec36ea8e33fb3d5e53e-us22

//ListId
//55e3973262