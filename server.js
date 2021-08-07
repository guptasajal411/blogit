//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

const homeStartingContent = 'Welcome to Blogit! Blogit is a dynamic blogging web application where you can publish your blogs with just a click! Just go to the "Compose" page from the navbar and publish your posts. Blogit will index your newly created posts on the homepage by which everyone around the globe can read your ideas! Blogit will also generate a custom URL with the title of your blog so you can share your blogs on the fly. This website is made with Node.js and EJS, which is a template engine. ';
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let posts = [];

app.get("/", function(req, res) {
	// console.log(posts);
	res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
})

app.get("/about", function(req, res) {
	res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function(req, res) {
	res.render("contact", {contactContent: contactContent});
})

app.get("/compose", function(req, res) {
	res.render("compose");
})

app.post("/compose", function(req, res) {
	var post = {
		titleInput: req.body.titleInput,
		blogInput: req.body.blogInput
	}
	posts.unshift(post);
	// console.log(posts);
	res.redirect("/");
})

// express dynamic routing with route parameters
app.get("/posts/:route", function(req, res){
	var lowerRoute = _.lowerCase(req.params.route);
	posts.forEach(function(post){
		if (_.lowerCase(post.titleInput) === lowerRoute){
			console.log("Match found!");
			res.render("post", {titleInput: post.titleInput, blogInput: post.blogInput})
		}
		else{
			console.log("Match not found :(")
		}
	})
	res.redirect("/");
})

app.listen(3000, function () {
	console.log("Server started on port 3000");
});