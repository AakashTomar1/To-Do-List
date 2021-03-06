const express=require("express");
const app=express();
const bodyParser=require("body-parser");
let items=[];
let workItems=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
  var today=new Date();
  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };

  var day=today.toLocaleDateString("hi-IN", options);
  res.render("list", {listTitle:day, newListItems:items});
});

app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work", newListItems:workItems});
});


app.post("/", function(req,res){
  var item=req.body.newItem;

  if(req.body.list==="Work"){
    workItems.push(item);
    res.redirect("/work");
  }

  else{
    items.push(item);
    res.redirect("/");
  }
});

app.post("/work", function(req,res){
  res.redirect("/work");
});


app.listen(3000, function(){
  console.log("Server running...");
});
