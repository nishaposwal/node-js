const express = require("express");

const app = express();

app.get("", (req, res)=>{

    res.send("hello from root")
})

app.get("/help", (req, res)=>{
    res.send("hello from help page")
})

app.get("/about", (req, res)=>{
    res.send("hello from about page")
})

app.get("/weather", (req, res)=>{
   
    res.send("weather is weathher")
})

app.listen(3000, () =>{
console.log("hello from server")
})