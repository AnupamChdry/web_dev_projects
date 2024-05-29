const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('viewengine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB')

const articlesSchema = mongoose.Schema({
    title:String,
    content:String
});

const Article = mongoose.model('Article',articlesSchema);

app.route('/articles')

.get(function(req,res){
    async function findArticles(){
        const foundArticles = await Article.find({});
        res.send(foundArticles);
    }
    findArticles();
})

.post(function(req,res){

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })

    newArticle.save(function(err){
        if(!err){
            console.log('Succesfully saved to collection');
        }
        else{
            console.log(err);
        }
    });
})

.delete(function(req,res){
    async function deleteCollection(){
        const deleteAll = await Article.deleteMany({});
        if(deleteAll){
            res.send('Successfully deleted all items');
        }
        else{
            res.send('Some error');
        }
    }
    deleteCollection();
});
/////////////////////////////////////////////////////////////////////////////
app.route('/articles/:articleTitle')

.get(function(req,res){
    // console.log(req.params.articleTitle);
    async function find(){
        const foundArticle = await Article.findOne({title: req.params.articleTitle});
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            console.log('no artcile found');
        }
    }
    find();
})

.put(function(req,res){
    async function update(){
        const updateArticle = await Article.updateOne({title:req.params.articleTitle},{title:req.body.title ,content: req.body.content},{overwrite:true});
        if(updateArticle){
            res.send('successfully overwritten the seleted Article');
        }
    }
    
    update();
})

.patch(function(req,res){
    async function updatePartial(){
        const updateArticle = await Article.updateOne({title:req.params.articleTitle},{$set: req.body});
        if(updateArticle){
            res.send('Successfully updated the selected Article without overwriting its whole data');
        }
    }
    updatePartial();
})

.delete(function(req,res){
    async function deleteSelected(){
        const deleteArticle = await Article.deleteOne({title:req.params.articleTitle});
        if(deleteArticle){
            res.send('Successfully deleted selected item');
        }
    }
    deleteSelected();
});


app.listen('3000',function(){
    console.log("server is running at port 3000");
});