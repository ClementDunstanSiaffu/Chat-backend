const mongoose = require('mongoose')
const Content = mongoose.model('CONTENT')
const users = [];
var nameChanging = [];

//console.log(users)

const addUser = ({id,jina,chumba,ids}) =>{
  let name 
  let room
  if(jina){
    name = jina.trim().toLowerCase();
  }else{
    name = ""
  }
  if(chumba){
    room = chumba.trim().toLowerCase();
  }else{
    room = ""
  }
 

/* const existingUser = users.find((user)=>user.room === room && user.name === name)
 console.log(existingUser)
 if(existingUser){
    
  } */
 

  const user = {id,name,room,ids}
  users.push(user);
  //nameChanging.push({name,ids})
  return {user};
  
}

const addChangingName = ({name,ids})=>{
  
  if(nameChanging.length >=1 && nameChanging[0].ids != ids){
    nameChanging.splice(0,2)
    const usersChanging = {name,ids}
    nameChanging.push(usersChanging)
  }else if(nameChanging.length >= 2 && nameChanging[0].ids === ids){
    nameChanging.splice(0,1)
    const usersChanging = {name,ids}
    nameChanging.push(usersChanging)
  }
  else{
    const usersChanging = {name,ids}
    nameChanging.push(usersChanging)
    //console.log("every thing is okay")
  }
    
  
  console.log(nameChanging)
 return nameChanging
}



const removeUser = (id) =>{
  const index = users.findIndex((user) => user.id === id);
  //console.log(index)
  if(index !== -1){
    return users.splice(index,1)[0]
  }
}

const getUser = (id) =>{
  //console.log(id);
  //console.log(users)
  const user1 =  users.find((user) => user.id === id)
  //console.log(user1)
  return user1
}

const getUserInRoom = (room) =>{
  const embu = users.filter((user) =>user.room === room)
  return embu
}

/*const allUserMessage = (room)=>{
  const docs = Content.find({room})
  console.log(docs)
}*/




module.exports = {addUser,removeUser,getUser,getUserInRoom,addChangingName}