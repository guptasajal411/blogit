# Blogit! 💻
Welcome to Blogit! Blogit is a full stack blog application by which you can share your ideas with the world! Made with Node.js and Express.js, Blogit uses EJS template engine to dynamically create a webpage for your blog. You can compose as many blogs as you like and share it with the world!

<p align="center">
    <img src = "https://user-images.githubusercontent.com/70312106/129069795-8b51ef01-a70b-4c4e-b56e-e1ac3f5b9713.gif">
</p>

# How to use this? 🤔
You can try out Blogit by going here: **<a href = "https://try-blogit.herokuapp.com/" target = "_blank">https://try-blogit.herokuapp.com/</a>**<br>
If your want to try this app on your local machine, follow these steps: 
1. Clone this repository in your local environment by the following command:<br>
```git clone https://github.com/guptasajal411/blogit.git```

2. Use NPM (Node Package Manager) to install dependencies for this project. <br>
```npm install```

3. Now use Node.js to start the chat application: <br>
```node server.js```

4. Go to `localhost:3000` on your browser. 

5. Now you can go to the Compose tab to publish your own blog. Your blog will be visible on the homepage, where you will also find a link to the dynamically created page and URL for your blog.

# Demo 👨‍💻

https://user-images.githubusercontent.com/70312106/129070689-9acdd041-3966-4530-b00e-0ab43f48043d.mp4

# How it works? 🛠
This web app uses Node.js for backend. I have used Express.js for serving static files, using middlewares and generating URL's for blogs with routes. The main part of the app is based on EJS, which is a template engine. As soon as you publish the blog, it gets saved on the server side and a new `div` is generated for your blogs. A new URL is also generated, as `/posts/your-title` by which you can access your blog. The compose blog page can be found at `/compose/`. The `Use random text` button uses random text from WikiPedia to generate a new blog.

# Inspiration 💡
This project was initially started as a course-along project which I made to learn EJS templating.

# What's next for Blogit 🙌
Imporving UI is the next step for this application. I would also like to hear any reviews, feedback or suggestions from you! Raise an issue **[here](https://github.com/guptasajal411/blogit/issues)** and we can work together!
