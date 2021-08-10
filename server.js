//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

const homeStartingContent = 'Welcome to Blogit! Blogit is a dynamic blogging web application where you can publish your blogs with just a click! Just go to the "Compose" page from the navbar and publish your posts. Blogit will index your newly created posts on the homepage by which everyone around the globe can read your ideas! Blogit will also generate a custom URL with the title of your blog so you can share your blogs on the fly. This website is made with Node.js and EJS, which is a template engine. ';
const aboutContent = 'Welcome to Blogit! Blogit is a dynamic blogging web application where you can publish your blogs with just a click! Just go to the "Compose" page from the navbar and publish your posts. Blogit will index your newly created posts on the homepage by which everyone around the globe can read your ideas! Blogit will also generate a custom URL with the title of your blog so you can share your blogs on the fly. This website is made with Node.js and EJS, which is a template engine.';
const contactContent = "This app is made by Sajal Gupta as a project for learning EJS and Node.js. GitHub: ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let posts = [{
	titleInput: 'Node.js', blogInput: `Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm,[6] unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts. Though .js is the standard filename extension for JavaScript code, the name "Node.js" doesn't refer to a particular file in this context and is merely the name of the product. Node.js has an event-driven architecture capable of asynchronous I/O. These design choices aim to optimize throughput and scalability in web applications with many input/output operations, as well as for real-time Web applications (e.g., real-time communication programs and browser games).[7] The Node.js distributed development project was previously governed by the Node.js Foundation,[8] and has now merged with the JS Foundation to form the OpenJS Foundation, which is facilitated by the Linux Foundation's Collaborative Projects program.[9] Corporate users of Node.js software include GoDaddy,[10] Groupon,[11] IBM,[12] LinkedIn,[13][14] Microsoft,[15][16] Netflix,[17] PayPal,[18][19] Rakuten, SAP,[20] Voxer,[21] Walmart,[22] Yahoo!,[23] and Amazon Web Services.[24]` },
	{ titleInput: 'COVID-19', blogInput: `Coronavirus disease 2019 (COVID-19) is a contagious disease caused by severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2). The first known case was identified in Wuhan, China, in December 2019.[7] The disease has since spread worldwide, leading to an ongoing pandemic.[8] Symptoms of COVID-19 are variable, but often include fever,[9] cough, headache,[10] fatigue, breathing difficulties, and loss of smell and taste.[11][12][13] Symptoms may begin one to fourteen days after exposure to the virus. At least a third of people who are infected do not develop noticeable symptoms.[14] Of those people who develop symptoms noticeable enough to be classed as patients, most (81%) develop mild to moderate symptoms (up to mild pneumonia), while 14% develop severe symptoms (dyspnea, hypoxia, or more than 50% lung involvement on imaging), and 5% suffer critical symptoms (respiratory failure, shock, or multiorgan dysfunction).[15] Older people are at a higher risk of developing severe symptoms. Some people continue to experience a range of effects (long COVID) for months after recovery, and damage to organs has been observed.[16] Multi-year studies are underway to further investigate the long-term effects of the disease.[16] COVID-19 transmits when people breathe in air contaminated by droplets and small airborne particles. The risk of breathing these in is highest when people are in close proximity, but they can be inhaled over longer distances, particularly indoors. Transmission can also occur if splashed or sprayed with contaminated fluids, in the eyes, nose or mouth, and, rarely, via contaminated surfaces. People remain contagious for up to 20 days, and can spread the virus even if they do not develop any symptoms.[17][18] Several testing methods have been developed to diagnose the disease. The standard diagnostic method is by detection of the virus' nucleic acid by real-time reverse transcription polymerase chain reaction (rRT-PCR), transcription-mediated amplification (TMA), or by reverse transcription loop-mediated isothermal amplification (RT-LAMP) from a nasopharyngeal swab. Preventive measures include physical or social distancing, quarantining, ventilation of indoor spaces, covering coughs and sneezes, hand washing, and keeping unwashed hands away from the face. The use of face masks or coverings has been recommended in public settings to minimize the risk of transmissions.` }, 
	{ titleInput: 'Pangea', blogInput: `Pangaea or Pangea ( /pænˈdʒiːə/[1]) was a supercontinent that existed during the late Paleozoic and early Mesozoic eras.[2] It assembled from earlier continental units approximately 335 million years ago, and began to break apart about 175 million years ago.[3] In contrast to the present Earth and its distribution of continental mass, Pangaea was centred on the Equator and surrounded by the superocean Panthalassa. Pangaea is the most recent supercontinent to have existed and the first to be reconstructed by geologists.` }];
	
app.get("/", function (req, res) {
	console.log(posts);
	res.render("home", { homeStartingContent: homeStartingContent, posts: posts });
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
	var post = {
		titleInput: req.body.titleInput,
		blogInput: req.body.blogInput
	}
	posts.unshift(post);
	// console.log(posts);
	res.redirect("/");
})

// express dynamic routing with route parameters
app.get("/posts/:route", function (req, res) {
	var lowerRoute = _.lowerCase(req.params.route);
	posts.forEach(function (post) {
		if (_.lowerCase(post.titleInput) === lowerRoute) {
			console.log("Match found!");
			res.render("post", { titleInput: post.titleInput, blogInput: post.blogInput })
		}
		else {
			console.log("Match not found :(")
		}
	})
	res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server started on port 3000");
});