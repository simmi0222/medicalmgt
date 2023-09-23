const mongoose = require("mongoose")
mongoose
.connect("mongodb://127.0.0.1:27017/medical")
.then(()=>{
    console.log("db connected");
})
.catch((error)=>{
    console.log("error");
})