import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    mobile:Number,
    password:String,
    isPrimeMember:Boolean,
    devices:[String]
})

const userModel=mongoose.model("users",userSchema)

export default userModel