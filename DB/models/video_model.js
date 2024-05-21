import mongoose from "mongoose"

const videoSchema=new mongoose.Schema({
    fileName:String,
    thumbnail:String,
    description:String,
    language:String,
    genre:String,
    title:String,
    releaseYear:Number,
    cast:[String],
    crew:[String],
    production:{type:mongoose.Schema.Types.ObjectId,ref:"productions"},
    isPrime:Boolean
})

export const videoModel=mongoose.model("videos",videoSchema)