const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const location = new Schema({
    street:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    postcode:{
        type:String
    }
})

const idCard = new Schema({
    idName:{
        type:String
    },
    idValue:{
        type:String,
    }
})

const picture = new Schema({
    large:{
        type:String
    },
    middle:{
        type:String,
    },
    thumbnail:{
        type:String
    }
})

const totalDays = new Schema({
    leave:{
        type:Number
    },
    permission:{
        type:Number
    },
    present:{
        type:Number
    }
})

const mySchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Kindly add some text"],
    },
    key:{
        type:Number,
    },
    email:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:[true,"kindly add Department"],
    },
    gender:{
        type:String,
    },
    dob:{
      type:String,
      required:true,  
    },
    age:{
        type:Number,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    totalDays:{
        type:totalDays,
        required:true
    },
    cell:{
        type:Number,
    },
    idCard:{
        type:idCard,
    },
    location:{
        type:location,
        required:[true,"kindly provide address properly"]
    },
    picture:{
        type:picture,
    }
},{timestamps:true})

module.exports =  mongoose.model("mydatabase",mySchema);