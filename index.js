import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

function Blog (title1, title2, description)
{
    this.title1 = title1;
    this.title2 = title2;
    this.description = description;
}

let blog1 = new Blog ("The answer to happiness", "How to make success thanks to the small things!", "random des");
let blog2 = new Blog ("Egg or Chicken?", "Who's born first?", "random des");
let blog3 = new Blog ("Hair or Bold?", "What's hotter?", "random des");

let blogList = [blog1,blog2,blog3];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => 
{
    res.render("index.ejs", {blog: blogList});
});

app.get("/about", (req, res) => 
{
    res.render("about.ejs");
});

app.get("/addBlog", (req, res) => 
{
        res.render("addBlog.ejs");
});

app.get("/post/:id", (req, res) => 
{
    const postId = parseInt(req.params.id);
    const blog = blogList[postId];

    if (blog) 
    {
        res.render("post.ejs", { blog: blog });
    } 
    else 
    {
        res.status(404).send("Post not found");
    }
});

app.get("/edit/:id", (req, res) => 
{
    const postId = parseInt(req.params.id);

    if (postId >= 3 && postId < blogList.length) 
    {
        res.render("edit.ejs", { postId: postId, blog: blogList[postId] });
    } 
    else 
    {
        res.status(403).send("You can't edit this post!");
    }
});

app.post("/submit", (req, res) => 
{
  
    let blog = new Blog(req.body["title1"], req.body["title2"], req.body["content"]);
    blogList.push(blog);
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => 
{
    const postId = parseInt(req.params.id);

    if (postId >= 3 && postId < blogList.length) 
    { 
        blogList.splice(postId, 1);
    }

    res.redirect("/");
});

app.post("/update/:id", (req, res) => 
{
    const postId = parseInt(req.params.id);

    if (postId >= 3 && postId < blogList.length) 
    {
        blogList[postId].title1 = req.body.title1;
        blogList[postId].title2 = req.body.title2;
        blogList[postId].description = req.body.description;
    }

    res.redirect("/");
});


app.listen(port, () => 
{
    console.log(`Listening on port ${port}`);
});