//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const homeStartingContent = "Welcome to my blog website! My name is Naresh Ponthangi, and I am currently pursuing my Masters in Computer Science at UMass Lowell. I am thrilled to introduce you to this platform, where I will be sharing my thoughts, insights, and experiences related to the fascinating world of technology, innovation, and computer science.Join me on this intellectual expedition as we dive into the realms of coding, algorithms, data science, and beyond. Together, let us explore the fascinating possibilities that emerge from the intersection of technology and human ingenuity."



const aboutContent = " As an aspiring computer scientist, I have always been passionate about exploring the latest advancements in this ever-evolving field. This blog serves as a medium for me to delve into various topics and engage in discussions that revolve around cutting-edge technologies, programming languages, artificial intelligence, and more."

const contactContent = "PERSONAL";
const posts = []
const app = express();
const mongoose = require('mongoose');



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://nareshmahesh910:Naresh%402001@cluster0.8atztpy.mongodb.net/blogPosts');
}
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  post: String,
});

const Blog = mongoose.model('Blog', blogSchema);


app.get('/', (req,res)=>{
  Blog.find().then((items)=>{
    console.log(items)
    res.render('home', {startingContent : homeStartingContent , posts : items });
  })
  
})

app.get('/about', (req,res)=>{
  res.render('about',{about : aboutContent})
})


app.get('/contact', (req,res)=>{
  res.render('contact',{contact : contactContent})
})

app.get('/compose' , (req,res)=>{
  res.render('compose')
})
app.post('/compose', (req,res)=>{
  let title1 = req.body.blog;
  let content1 = req.body.post;
  const post = new Blog( {
     title : title1 ,
     post : content1
  })
  post.save()

  res.redirect('/')
  
})

app.get('/posts/:postId' , (req,res)=>{
  const p = req.params.postId
   const l = posts.length;
   Blog.findOne({_id:p}).then(( post) =>{

    res.render("post", {
 
      title: post.title,
 
      content: post.post
 
    });
 
  });
  })


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
