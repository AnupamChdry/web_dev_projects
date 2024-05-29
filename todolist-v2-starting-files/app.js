//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require("lodash")

// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

mongoose.connect("mongodb://localhost:27017/todolistDB",{useUnifiedTopology: true});

const itemsSchema=mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item',itemsSchema);

const item1 = new Item({
  name : 'Welcome to our to do list'
});

const item2 = new Item({
  name : 'Hit the + button to add new items'
});

const item3 = new Item({
  name : '<-- Hit this checkbox to delete this item'
});

const defaultItems = [item1,item2,item3];

const listSchema = mongoose.Schema({
  name:String,
  items:[itemsSchema]
})

const List = mongoose.model('List',listSchema)

app.get("/", function(req, res) {
  var items;
  async function myitems(){
  items = await Item.find({});  
  console.log(items);

  if(items.length === 0){
  Item.insertMany(defaultItems);
  res.redirect('/');
  }
  else{
  res.render("list", {listTitle: 'Today', newListItems: items});
  }
  }
  myitems();
// const day = date.getDate();



});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const listName = req.body.list;
  // console.log(listName);
  const newItem = new Item({
    name : item
  });
  // console.log(newItem);

  if(listName === 'Today'){
    newItem.save();
    res.redirect('/');
  }
  else{
    async function findList(){
      const foundListItems = await List.findOne({name:listName});
      foundListItems.items.push(newItem);
      foundListItems.save();
      res.redirect('/' + listName);
    }
  findList();

  }

  
});

app.post("/delete",function(req,res){
  const checkedItem = req.body.checkbox;
  const listName = req.body.listName;
  // console.log(listName);
  if(listName === 'Today'){
    async function itemDelete(){    // Item.findByIdAndDelete(checkedItem);
      const deletedItem = await Item.findByIdAndDelete(checkedItem);
    }
    itemDelete();
    res.redirect('/');
  }
  else{
    async function deleteItem(){
      const deleted = await List.findOneAndUpdate({name:listName},{$pull:{items:{_id: checkedItem}}});
      if(deleted){
        res.redirect('/' + listName);
      }
    }
    deleteItem();
  }
  
})

// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });

app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);


  async function findListName() {
      const find = await List.findOne({ name: customListName });
      if (find) {
        res.render("list", {listTitle: find.name, newListItems: find.items});
        
      } else {
        // console.log('Exists');
        // console.log("before creating list");
        const list = new List({
          name:customListName,
          items:defaultItems
        })
        // console.log("after creating list");

        list.save();
        res.redirect('/' + customListName);
      }
  }
  
  findListName();

  

  
})

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
