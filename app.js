//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const { availableParallelism } = require("os");
const mongoose = require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'));
// const url = "mongodb://127.0.0.1:27017/blogsite";
const url = "mongodb+srv://vikasbishnoi:Test123@cluster0.gup7nbo.mongodb.net/blogsite"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];
let truct = [];
const blogSchema = {
  title: String,
  content: String
};
const Blog = mongoose.model('blog', blogSchema);
const blog1 = new Blog({
  title: "Day1 ",
  content: "Diwali"
});
const blog2 = new Blog({
  title: "Day2 ",
  content: "Jai Shree Ram"
});
const defualtItems = [blog1, blog2];
// Only for intial test
// Blog.insertMany(defualtItems)
//     .then(msg => {
//         console.log(msg);
//     })
//     .catch(err => {
//         console.log(err);
//     });
app.get('/', function (req, res) {
  Blog.find()
    .then(msg => {
      // console.log(msg);
      res.render("home", {
        startingContent: homeStartingContent,
        post: msg
      });
      console.log("Succesully find");
    })
    .catch(err => {
      console.log(err);
    });
});
app.get('/about', function (req, res) {
  res.render('about', { startingContent: aboutContent });
});
app.get('/contact', function (req, res) {
  res.render('contact', { startingContent: contactContent });
});
app.get('/compose', function (req, res) {
  res.render('compose');
})
app.get('/post/:postName', function (req, res) {
  const val = req.params.postName;
  // const compare=_.lowerCase(val);
  console.log("post try");
  // console.log(val);
  Blog.find({ _id: val })
    .then(msg => {
      // console.log(msg[0].title);
      const storeTitle = msg[0].title;
      const content = msg[0].content;
      res.render('post', { title: storeTitle, content: content });
    })
    .catch(err => {
      console.log(err);
      // res.send('asdfas');
      res.render('post', { title: "Error 404", content: "In Future we add this also" });
    });
});
app.post('/compose', function (req, res) {
  const post = new Blog({
    title: req.body.postTitle,
    content: req.body.content
  });
  post.save();
  res.redirect('/');
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
