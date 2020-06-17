
const mongoose = require('mongoose');

var contentSchema = mongoose.Schema({

    id:{
        type:String
    },
    name:{
        type:String
    },
    room:{
        type:String
    },
    message:{
        type:String
    },
    ids:{
        type:String
    },
    createdAt :{
        type:Date,
        default:Date.now,
        expires:7200,
    }
})

contentSchema.statics.findByCredentials = async function(){
    const thoseUser = await Content.find()
    //console.log(thoseUser)
    return thoseUser
}

mongoose.model('CONTENT',contentSchema)
const Content = mongoose.model('CONTENT',contentSchema)
module.exports = Content;