const mongoose = require('mongoose')

const bankSchema =  mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        unique:false
    },
    name:{
        type:String,
        required:true,
        unique:false
    },
    cash:{
        type:Number,
        default:0
    },
    credit:{
        type:Number,
        default:0
    }
   
    
})

const bank  = mongoose.model('bank',bankSchema);

module.exports= bank;