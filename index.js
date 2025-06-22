const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({ extended :true }));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
let posts =[
    {
        id : uuidv4(),// unique id is been assigned to user
        username: "apnacollege",
        content : "i love coding!"
    },
    {
        id : uuidv4(),
        username: "shradhakhapra",
        content : "hard word is imp for success."
    },
    {
        id :uuidv4(),
        username: "khushbookanojiya",
        content : "software engineer"
    }
];



app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/post/new",(req,res)=>{
    res.render("form.ejs");
})

app.post("/posts",(req,res)=>{
    let {username ,content } = req.body; //destructuring
    let id = uuidv4(); // new id will be geenrat after creating each post 
   posts.push({id,username,content});
    res.redirect("/posts"); //by default get req is been sended by this /post url
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    console.log(id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id", (req,res)=>{
     let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id ==p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id,username} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
      let {id} = req.params;
       posts = posts.filter((p)=> id !== p.id);
      res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("Listening to port : 8080");
});