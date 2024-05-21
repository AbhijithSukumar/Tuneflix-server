import mongoose from "mongoose"

export const connectDB=()=>{
  mongoose.connect(process.env.CONNECTION_STRING,{dbName:"ott"}).then(()=>{
    console.log("DB connected");
  }).catch((err)=>{
    console.log("DB failed to connect :- ",err);
  })
}