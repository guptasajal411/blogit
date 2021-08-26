//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogitDB")

const homeStartingContent = 'Welcome to Blogit! Blogit is a dynamic blogging web application where you can publish your blogs with just a click! Go to the "Compose" page from the navbar and publish your posts. Blogit will index your newly created posts on the homepage. Blogit will also generate a custom URL with the title of your blog so you can share your blogs on the fly.';
const aboutContent = 'Welcome to Blogit! Blogit is a dynamic blogging web application where you can publish your blogs with just a click! Just go to the "Compose" page from the navbar and publish your posts. Blogit will index your newly created posts on the homepage by which everyone around the globe can read your ideas! Blogit will also generate a custom URL with the title of your blog so you can share your blogs on the fly. This website is made with Node.js and EJS, which is a template engine.';
const contactContent = "This app is made by Sajal Gupta as a project for learning EJS and Node.js. GitHub: ";

const app = express();
var date = new Date(); //time when the server gets started
if (date.getHours() < 12) {
	var time = date.getHours() + ":" + date.getMinutes() + " AM"
} else if (date.getHours() == 12) {
	var time = date.getHours() + ":" + date.getMinutes() + " PM"
} else {
	var time = date.getHours() - 12 + ":" + date.getMinutes() + " PM"
}

// create blog schema
const blogSchema = {
	titleInput: String,
	blogInput: String,
	timeStamp: String,
	blogImage: String
}

// create a new mongoose model
const Blog = mongoose.model("Blog", blogSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
	Blog.find({}, function (err, blog) {
		if (err) {
			console.log(err);
		} else {
			if (blog.length === 0) {
				// save default blogs to db if blogs collection is empty
				const Nodejs = new Blog({
					titleInput: 'Node.js',
					blogInput: `Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm,[6] unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts. Though .js is the standard filename extension for JavaScript code, the name "Node.js" doesn't refer to a particular file in this context and is merely the name of the product. Node.js has an event-driven architecture capable of asynchronous I/O. These design choices aim to optimize throughput and scalability in web applications with many input/output operations, as well as for real-time Web applications (e.g., real-time communication programs and browser games).[7] The Node.js distributed development project was previously governed by the Node.js Foundation,[8] and has now merged with the JS Foundation to form the OpenJS Foundation, which is facilitated by the Linux Foundation's Collaborative Projects program.[9] Corporate users of Node.js software include GoDaddy,[10] Groupon,[11] IBM,[12] LinkedIn,[13][14] Microsoft,[15][16] Netflix,[17] PayPal,[18][19] Rakuten, SAP,[20] Voxer,[21] Walmart,[22] Yahoo!,[23] and Amazon Web Services.[24]`,
					timeStamp: time,
					blogImage: "data:image/png;base64,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"
				})
				const covid = new Blog({
					titleInput: 'COVID-19',
					blogInput: `Coronavirus disease 2019 (COVID-19) is a contagious disease caused by severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2). The first known case was identified in Wuhan, China in December 2019.[7] The disease has since spread worldwide, leading to an ongoing pandemic.[8] Symptoms of COVID-19 are variable, but often include fever,[9] cough, headache,[10] fatigue, breathing difficulties, and loss of smell and taste.[11][12][13] Symptoms may begin one to fourteen days after exposure to the virus. At least a third of people who are infected do not develop noticeable symptoms.[14] Of those people who develop symptoms noticeable enough to be classed as patients, most (81%) develop mild to moderate symptoms (up to mild pneumonia), while 14% develop severe symptoms (dyspnea, hypoxia, or more than 50% lung involvement on imaging), and 5% suffer critical symptoms (respiratory failure, shock, or multiorgan dysfunction).[15] Older people are at a higher risk of developing severe symptoms. Some people continue to experience a range of effects (long COVID) for months after recovery, and damage to organs has been observed.[16] Multi-year studies are underway to further investigate the long-term effects of the disease.[16] COVID-19 transmits when people breathe in air contaminated by droplets and small airborne particles. The risk of breathing these in is highest when people are in close proximity, but they can be inhaled over longer distances, particularly indoors. Transmission can also occur if splashed or sprayed with contaminated fluids, in the eyes, nose or mouth, and, rarely, via contaminated surfaces. People remain contagious for up to 20 days, and can spread the virus even if they do not develop any symptoms.[17][18] Several testing methods have been developed to diagnose the disease. The standard diagnostic method is by detection of the virus' nucleic acid by real-time reverse transcription polymerase chain reaction (rRT-PCR), transcription-mediated amplification (TMA), or by reverse transcription loop-mediated isothermal amplification (RT-LAMP) from a nasopharyngeal swab. Preventive measures include physical or social distancing, quarantining, ventilation of indoor spaces, covering coughs and sneezes, hand washing, and keeping unwashed hands away from the face. The use of face masks or coverings has been recommended in public settings to minimize the risk of transmissions.`,
					timeStamp: time,
					blogImage: "https://www.mygov.in/sites/all/themes/mygov/images/covid/covid-share.jpg"
				})
				const pangea = new Blog({
					titleInput: 'Pangea',
					blogInput: `Pangaea or Pangea ( /pænˈdʒiːə/[1]) was a supercontinent that existed during the late Paleozoic and early Mesozoic eras.[2] It assembled from earlier continental units approximately 335 million years ago, and began to break apart about 175 million years ago.[3] In contrast to the present Earth and its distribution of continental mass, Pangaea was centred on the Equator and surrounded by the superocean Panthalassa. Pangaea is the most recent supercontinent to have existed and the first to be reconstructed by geologists.`,
					timeStamp: time,
					blogImage: "data:image/png;base64,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"
				})

				Nodejs.save();
				covid.save();
				pangea.save();
				// check all blogs: db.blogs.find({}, {"blogInput": 0, "blogImage": 0, "_id": 0, "__v": 0, "timeStamp": 0})
			} else {
				// render the page if blogs collection is not empty
				res.render("home", { homeStartingContent: homeStartingContent, posts: blog.reverse() });
			}
		}
	})
})

app.get("/about", function (req, res) {
	res.render("about", { aboutContent: aboutContent });
})

app.get("/contact", function (req, res) {
	res.render("contact", { contactContent: contactContent });
})

app.get("/compose", function (req, res) {
	res.render("compose");
})

app.post("/compose", function (req, res) {
	var newDate = new Date(); //time when new blog is published
	if (newDate.getHours() < 12) {
		const post = new Blog({
			titleInput: req.body.titleInput,
			blogInput: req.body.blogInput,
			timeStamp: newDate.getHours() + ":" + newDate.getMinutes() + " AM",
			blogImage: req.body.blogImage
		})
		post.save();
	} else if (newDate.getHours() == 12) {
		const post = new Blog({
			titleInput: req.body.titleInput,
			blogInput: req.body.blogInput,
			timeStamp: newDate.getHours() + ":" + newDate.getMinutes() + " PM",
			blogImage: req.body.blogImage
		})
		post.save();
	} else {
		const post = new Blog({
			titleInput: req.body.titleInput,
			blogInput: req.body.blogInput,
			timeStamp: newDate.getHours() - 12 + ":" + newDate.getMinutes() + " PM",
			blogImage: req.body.blogImage
		})
		post.save();
	}
	res.redirect("/");
})

// express dynamic routing with route parameters
app.get("/posts/:route", function (req, res) {
	var lowerRoute = _.lowerCase(req.params.route);
	Blog.findOne({ titleInput: /^lowerRoute/i }, function (err, blog) {
		res.render("post", { titleInput: blog.titleInput, blogInput: blog.blogInput, blogImage: blog.blogImage })
	})
	console.log(req.params.route);
	console.log(lowerRoute);
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server started on port 3000");
});