const express = require("express");
const https = require("https");

const app = express();

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");

    // res.send("Server is running");
})

app.post("/",function(req,res){
    var query = req.body.cityName;
    var appKey = "2f60e899f4f5b6efc8ff9636dc3adb06";
    var unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + appKey + "&units="+ unit +" ";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            var weatherData = JSON.parse(data);
            // console.log(weatherData.main.temp);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const description = weatherData.weather[0].description;
            // console.log(description);
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>Current Temparature of "+ query +" is " + temp + " degree celsius</h1>")
            res.write("<p>The weather type is " + description+ "</p>");
            res.write("<img src = " + imgurl + " >");
            res.send();
        })
    })
})




app.listen(3000,function(){
    console.log("server has been started at port 3000");
})
