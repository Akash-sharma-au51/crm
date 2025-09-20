import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,'this username already exist in db,Username must be unique,try diffrent one']
    },
    email:{
        type:String,
        required:true,
        unique:[true,'this email already exist in db,email must be unique,try diffrent one']
    },
    password:{
        type:String,
        required:true,
        minLength:[6,'password must be at least 6 characters'],
        maxLength:[64,'password must be at most 64 characters'],
        select:false // this field would not be available while running query for security measures
    },
    role:{
        type:String,
        required:true,
        default:'user',
        enum:['user','admin']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const Users = mongoose.model('Users',userSchema)

export default Users

