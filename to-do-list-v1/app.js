const express = require("express");
const bodyParser = require("body-parser");
const getDate = require("./date");
const date = require(__dirname + '/date.js');

// console.log(date());
// date = getDate();

const app = express();

app.set('view engine','ejs'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const items =["Buy Food","Cook Food","Eat Food"]; //we can declare array in js as const instead of var i.e we can push new elements but cannot redeclare this array i.e, item to new array
const workListItems=[];

app.get("/",function(req,res){
    // res.send("thankyou for your input");

    // var day = "";
    var day = date.getDate();

    res.render('list',{listTitle : day, newListItems:items});
});




app.post("/",function(req,res){
    const item = req.body.newItem;

    if(req.body.list === 'work'){
        workListItems.push(item);
        res.redirect('/work');
    }else{
        items.push(item);
        res.redirect('/');
    }
    
    console.log(req.body.list);

    // console.log(item);
});

app.get('/work',function(req,res){
    res.render('list',{listTitle: 'work list', newListItems:workListItems});
})

app.get('/about',function(req,res){
    res.render('about');
})

app.listen(3000,function(){
    console.log("server has been started at port 3000");
});