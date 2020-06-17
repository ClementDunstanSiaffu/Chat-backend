const mongoose = require('mongoose')
const Content = mongoose.model('CONTENT')


exports.message = (req,res)=>{
    Content.find((err,docs)=>{
        if(!err){
            res.json(docs)
        }else{
            console.log("there is an error")
        }
    })
}


/*const{getFriends} = require('../users')

const rooms = ["education","games","love","music","sports"]
let value = ""
const content = rooms.map((third)=>{return third})

exports.friends = (req,res)=>{
    
    const content = getFriends(value)
    console.log(content)
    res.json(content)
    */