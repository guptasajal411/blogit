# Blogit! 💻
Welcome to Blogit! Blogit is a full stack blog application by which you can share your ideas with the world! Made with Node.js and Express.js, Blogit uses EJS template engine to dynamically create a webpage for your blog. CRUD operations on your blogs are done with MongoDB Atlas, on which the database is hosted. You can compose as many blogs as you like and share it with the world! ✨

<p align="center">
    <img src = "https://user-images.githubusercontent.com/70312106/131097566-59ff8beb-ae11-4566-b143-f5bb9af834c9.gif" width="100%">
</p>

# Demo 👨‍💻

https://user-images.githubusercontent.com/70312106/131096426-28aba0f3-9a88-4876-ac80-f9207ea3e699.mp4

# How to use this? 🤔
You can try out Blogit by going here: **<a href = "https://try-blogit.herokuapp.com/" target = "_blank">https://try-blogit.herokuapp.com/</a>**<br>
If your want to try this app on your local machine, follow these steps: 
1. Clone this repository in your local environment by the following command:<br>
```git clone https://github.com/guptasajal411/blogit.git```

2. Use NPM (Node Package Manager) to install dependencies for this project. <br>
```npm install```

3. Use MongoDB Atlas service to set up your database on the cloud.

3. Use a `.env` file for storing the username and password of your MongoDB Atlas database. The variables for these are: <br>
`usernameMongoDB` and `password`

3. Now use Node.js to start the chat application: <br>
```node server.js```

4. Go to `localhost:3000` on your browser. This is the homepage of Blogit. You can read blogs from here and click `Read more` to, well, read more!

5. Now you can go to the Compose tab to publish your own blog. Your blog will be visible on the homepage, where you will also find a link to the dynamically created page and URL for your blog.

6. For updating the blog, you can go to the Update tab and search for the blog you want to update. After that, you can add new title, content or image to the blog.

# How it works? 🛠
This web app uses Node.js for backend. I have used Express.js for serving static files, using middlewares and generating URL's for blogs with routes. The main part of the app is based on EJS, which is a template engine. As soon as you publish the blog, it gets saved on the MongoDB database with Mongoose and a new `div` is generated for your blogs. A new URL is also generated, as `/posts/your-title` by which you can access your blog. The compose blog page can be found at `/compose/`. The `Use random text` button uses random text from WikiPedia to generate a new blog. All the blogs are saved on a MongoDB database, which is served with MongoDB Atlas service. You can also update your blogs if you want to change the title, content or the image associated with any of the blog. All these CRUD operations are carried out on MongoDB with Mongoose.

# Inspiration 💡
This project was initially started as a course-along project which I made to learn Node.js and Express.js

# What's next for Blogit 🙌
Imporving UI is the next step for this application. I would also like to hear any reviews, feedback or suggestions from you! Raise an issue **[here](https://github.com/guptasajal411/blogit/issues)** and we can work together!
