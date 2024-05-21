import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { connectDB } from "./DB/config/connection.js"
import productionRouter from "./routers/production_router.js"
import cors from "cors"
import adminRouter from "./routers/admin_router.js"
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import userRouter from "./routers/user_router.js"

const dir=dirname(fileURLToPath(import.meta.url))

dotenv.config() //configuring .env properties

const app=express()

//database connection [MongoDB atlas cluster]
connectDB()

app.use(cors())

//middleware to parse the body of the object to js object
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/videos",express.static(path.join(dir,'videos')))
app.use("/audios",express.static(path.join(dir,'audios')))



//configuring routers
app.use("/",productionRouter)
app.use("/api2",adminRouter)
app.use("/",userRouter)


//server creation
app.listen(process.env.PORT,()=>{
    console.log(`server running on port:${process.env.PORT}`);
})
