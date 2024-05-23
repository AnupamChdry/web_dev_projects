const express = require('express');

const app = express(); // import module of express

app.get("/", function(req,res){ //what would happen when browser gets in touch with our server
    // console.log(req);
    res.send("<h1>Hello World!</h1>");
})

app.get("/contact", function(req,res){
    res.send("contac me at anupam@gmail.com")
})

app.get("/about", function(req,res){
    res.send("I am a Software Developer");
})
app.get("/hobbies", function(req,res){
    res.send("Play Video Games!");
})

// const port = 3000;
app.listen(3000, function(){  //created our first server
    console.log('Server has been started at port 3000');
});