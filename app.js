const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

let items = ["Task 1","Task 2","Task 3"];
let workitems=[];

app.use(express.static("public"))
app.get("/", function (req, res) {
    let date = new Date();
    let day = "";
    let options ={
        weekday:"long",
        day:"numeric",
        month:"long",
        
    }
    day = date.toLocaleDateString("en-US",options)
    res.render("lists", { listTitle: day, newTasks:items});

    

})
app.get("/work",function(req,res){
    res.render("lists",{listTitle:"Work List",newTasks:workitems})
})

app.post("/",function(req,res){

    if(req.body.listType==="Work"){
        let item =req.body.newItem;
        workitems.push(item);
        res.redirect("/work");
    }else{
        let currentItem = req.body.newItem;
        items.push(currentItem);
        res.redirect("/");
    }
 
  
})

app.get("/about",function(req,res){
    res.render("about")
})

app.listen(3000, function (req, res) {
    console.log("Server started at port 3000");
})