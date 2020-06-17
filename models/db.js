
const mongoose = require('mongoose');
const uri = "mongodb+srv://Victorius:Cle*1995@cluster0-t78mw.azure.mongodb.net/Chats?retryWrites=true&w=majority";

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true})
.then( ()  => {console.log("MongoDB connected")})
.catch(err =>{ console.log("err")})

require('./structure');