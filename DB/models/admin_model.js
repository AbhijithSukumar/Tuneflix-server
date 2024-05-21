import mongoose from "mongoose"

const adminSchema=new mongoose.Schema({
    username:String,
    password:String,
    productions:[{type:mongoose.Schema.Types.ObjectId,ref:"productions"}]
})

export const adminModel=mongoose.model("admin",adminSchema)