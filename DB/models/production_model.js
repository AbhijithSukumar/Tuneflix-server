import mongoose from "mongoose"

const productionSchema=new mongoose.Schema({
    email:String,
    mobile:Number,
    password:String,
    companyName:String,
    regID:String,
    address:String,
    website:String,
    isVerified:Boolean,
    videos:[{type:mongoose.Schema.Types.ObjectId,ref:"videos"}],
    audios:[{type:mongoose.Schema.Types.ObjectId,ref:"audios"}]
})

export const productionModel=mongoose.model("productions",productionSchema)
