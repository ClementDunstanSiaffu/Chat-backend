//require('./models/db')
//const mongoose = require('mongoose')
//const Content = mongoose.model('CONTENT')
//const content1 = require('./models/structure')
const express = require('express');
const socketio = require('socket.io');
const http = require('http')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;
//const routes = require('./routes');
var path = require('path');
const {addUser,removeUser,getUser,getUserInRoom,addChangingName}  = require('./users.js')

var allUser = []



io.on('connection',(socket) =>{
    console.log("we have the connection")
    
    socket.on('join',(result) =>{
    const {user} = addUser({id:socket.id,jina:result.name,chumba:result.room,ids:result.id});
    console.log({user})
    const newName = addChangingName({name:result.name,ids:result.id})
    console.log(newName)
    if(newName.length > 1){
     socket.emit('message',{user:"admin",text:`you changed name from ${newName[0].name} to ${newName[1].name}`})
     socket.broadcast.to(user.room).emit('message',{user:"admin",text:`${newName[0].name} has changed name to ${newName[1].name}`});
    }else{
     socket.emit('message',{user:"admin",text:`${user.name} welcome to the conversation concerning ${user.room}`});
     socket.broadcast.to(user.room).emit('message',{user:"admin",text:`${user.name} has joined to the conversation `});
    }
  
    socket.join(user.room) 
   
   /* const content2 =   content1.findByCredentials()
   console.log(content2)*/
    

    //const allUserTyped = allUserMessage(user.room);
    
          
      /*  allUser.map((oneUser)=>{
            if(oneUser.room === user.room){
                socket.emit('message',{user:oneUser.name,text:oneUser.message})
            }else {
                console.log("empty")
            }
        })*/
      

   const friend = getUserInRoom(user.room)
    console.log(friend)
    socket.emit('friends',friend)
    })

    /*socket.on('saved',()=>{
        const user = getUser(socket.id)
        Content.find((err,docs)=>{
            if(!err){
                docs.map((doc)=>allUser.push(doc))
                allUser.map((oneUser)=>{
                    if(oneUser.room === user.room){
                        socket.emit('message',{user:oneUser.name,text:oneUser.message})
                    }else {
                        console.log("empty")
                    }
                })
            }else {
                console.log("there is an error")
            }
        })
        
    })*/
    
    socket.on('sendMessage',(message,callback) =>{
    
       const user = getUser(socket.id)
        
       /* var content = new Content()
        content.id = user.id;
        content.name = user.name;
        content.room = user.room;
        content.message = message
        content.ids = user.ids;
        content.save();--*/
       
        io.to(user.room).emit('message',{user:user.name,text:message,id:user.ids})
        callback()
    }) 


    socket.on("disconnect",()=>{
        const user = removeUser(socket.id)
       
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left.`})
            console.log('user had left')
        }
        
    }) 

    

})

/*app.get('/ujumbe',(req,res)=>{
    Content.find((err,docs)=>{
        if(!err){
            res.json(docs)
        }else{
            console.log("there is an error")
        }
    })
})*/




server.listen(PORT,()=>{
    console.log(`listening to the port ${PORT} `)
})