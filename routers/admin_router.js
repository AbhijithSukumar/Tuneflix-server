import express from "express"
import { FetchProductions, VerifyProduction, adminLogin, ProductionsToVerify,GetVideos, GetAudios, GetProductions,MakeVideoPrime, MakeAudioPrime } from "../controllers/admin_controller.js"

const adminRouter=express.Router()

adminRouter.post("/admin/auth/login",adminLogin)
adminRouter.get("/admin/getProductions",FetchProductions)
adminRouter.post("/admin/verify/production",VerifyProduction)
adminRouter.get("/admin/verify/productions",ProductionsToVerify)
adminRouter.get("/admin/productions",GetProductions)
adminRouter.get("/admin/videos",GetVideos)
adminRouter.get("/admin/audios",GetAudios)
adminRouter.post("/admin/video/makePrime",MakeVideoPrime)
adminRouter.post("/admin/audio/makePrime",MakeAudioPrime)

export default adminRouter