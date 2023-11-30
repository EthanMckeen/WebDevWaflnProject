const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        min: 5
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    desc:{
        type:String,
        max:50,
    },
    pronouns:{
        type:Number,
        enum:[0,1,2,3,4,5,6],
        default: 0,
    },
    birthday:{
        type:String,
        max:20,
        default: "-"
    },
    city:{
        type:String,
        max:30,
        default: "-"
    }
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);
