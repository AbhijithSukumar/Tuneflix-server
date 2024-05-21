import mongoose from "mongoose"

const audioSchema=new mongoose.Schema({
    fileName:String,
    thumbnail:String,
    description:String,
    language:String,
    genre:String,
    title:String,
    releaseYear:Number,
    artist:String,
    production:{type:mongoose.Schema.Types.ObjectId,ref:"productions"},
    isPrime:Boolean
})

export const audioModel=mongoose.model("audios",audioSchema)