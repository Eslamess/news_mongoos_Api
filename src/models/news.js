const Mongoose = require('mongoose')

 
// const currentTime = new Date();

// console.log(currentTime);


const task = Mongoose.model('tasks', {


    title: {
        type: String,
        required:true

    },
    
    description: {
        type: String,
      
        require: true

    },
    time:{
        type:String
    },
    
    owner:{
        type:Mongoose.Schema.Types.ObjectId,
        required:true

    }
  



})
module.exports = task