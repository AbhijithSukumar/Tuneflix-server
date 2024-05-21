import express from "express"
import { UserSignup, showAllAudios, showAllVideos, subscribePremium, userLogin } from "../controllers/user_controller.js"

const userRouter=express.Router()

userRouter.post("/login",userLogin)
userRouter.post("/signup",UserSignup)
userRouter.get("/subscribe/premium/:userID",subscribePremium)
userRouter.get("/api/videos",showAllVideos)
userRouter.get("/api/audios",showAllAudios)


export default userRouter