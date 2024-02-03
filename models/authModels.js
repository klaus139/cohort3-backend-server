import mongoose from 'mongoose';

const authSchema = mongoose.Schema({
    firstname:{
        type:String,
        required: true,
    },
    lastname:{
        type:String,
        required: true,
    },
    phonenumber:{
        type:Number,
        unique:true,
        required: true,

    },
    email:{
        type:String,
        unique: true,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    isSubAdmin:{
        type:Boolean,
        default:false,

    }

},{timestamps: true})

const Auth = mongoose.model('Auth', authSchema);
export default Auth;