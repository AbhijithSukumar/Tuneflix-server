//************************************************************************************************************************

import { audioModel } from "../DB/models/audio_model.js";
import userModel from "../DB/models/user_model.js";
import { videoModel } from "../DB/models/video_model.js";

// production getAudios api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api2/user/auth/signup
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const UserSignup = async (req, res) => {
  const { username, email, mobile, password } = req.body;

  const user = new userModel({
    username,
    email,
    mobile,
    password,
    isPrimeMember:false
  });

  const checkuser = await userModel.findOne({ email: email });

  try {
    if(!checkuser){
      const addedUser = await user.save();
    console.log(addedUser);
    if (addedUser) {
      res.status(200).json({
        message: "user added",
      });
    }
    }
    else{
      res.status(400).json({msg:"email already registered"})
    }
  } catch (error) {
    console.log(err);
    res.status(500);
  }
};

export const userLogin = async (req,res) =>{
  const {email,password}=req.body
  console.log(req.body);

  const user = await userModel.findOne({ email: email });
  console.log(user);
  if (user && user.password === password) {
    res.status(200).json(
      user);
  } else {
    res.status(401).json({
      message: "invalid credentials",
    });
  }
}

export const subscribePremium = async (req,res) =>{
try {
  const userID=req.params.userID
  console.log("-------------",req.params);

  await userModel.findByIdAndUpdate(userID,{$set:{
    isPrimeMember:true
  }});

  res.status(200).json({
    msg:"premium subscribed"
  })
} catch (error) {
  res.status(500).json({
    msg:"server error"
  })
}
}

export const showAllAudios = async (req, res) => {
  console.log("Api hits");


  try {
    const audios=await audioModel.find()
    
    if(audios && audios.length>0)
    {
      res.status(200).json({audios:audios})
    }
    else
    {
      res.status(400).json({msg:"no audios"})
    }
  } catch (error) {
    res.status(500).json({
      msg:"internal server error"
    })
  }
};

export const showAllVideos = async (req, res) => {
  console.log("Api hits");


  try {
    const videos=await videoModel.find()
    
    if(videos && videos.length>0)
    {
      res.status(200).json({videos:videos})
    }
    else
    {
      res.status(400).json({msg:"no videos"})
    }
  } catch (error) {
    res.status(500).json({
      msg:"internal server error"
    })
  }
};