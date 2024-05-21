import { adminModel } from "../DB/models/admin_model.js";
import { audioModel } from "../DB/models/audio_model.js";
import { productionModel } from "../DB/models/production_model.js";
import { videoModel } from "../DB/models/video_model.js";

// productions fetch api [Get]
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api2/admin/getProductions
// content-type                  :- JSON

//----------------------------------------------------------------------------------
export const FetchProductions = async (req, res) => {
  //destructuring request body
  const productions = await productionModel.find();

  if (productions) {
    res.status(200).json(productions);
  } else {
    res.status(500).json({ message: "internal server error" });
  }
};


//********************************************************************************************************************************* */

// verify production api [Post]
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api2/admin/verify/production
// content-type                  :- JSON

//----------------------------------------------------------------------------------
export const VerifyProduction = async (req, res) => {
  console.log("inside");
  //destructuring request body
  const { productionID } = req.body;
  console.log(req.body);
  const production = await productionModel.findByIdAndUpdate(productionID, {
    $set: { isVerified: true },
  });
  console.log(production);

  if (production) {
    res.status(200).json({ message: "verification success" });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
};


//********************************************************************************************************************************* */

// verify production api [Post]
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api2/admin/verify/production
// content-type                  :- JSON

//----------------------------------------------------------------------------------
export const adminLogin = async (req, res) => {
  //destructuring request body
  const { username,password } = req.body;
  const user = await adminModel.find()

  if (user[0].username==username && user[0].password==password) {
    res.status(200).json({ message: "login success" });
  } else {
    res.status(401).json({ message: "login failed" });
  }
};


//************************************************************************************************************************

// production getAudios api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/audios
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const ProductionsToVerify = async (req, res) => {
  const productions=await productionModel.find({isVerified:false}).populate("videos").populate("audios")
  console.log(productions);
  if(productions && productions.length > 0)
  {
    res.status(200).json(productions)
  }
  else{
    console.log("inside else");
    res.status(204).json({message:"no productions to verify"})
  }
  
};

//************************************************************************************************************************

// production getAudios api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/audios
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const GetVideos = async (req, res) => {
  try {
    const videos=await videoModel.find()

    if(videos && videos.length>0)
    {
      res.status(200).json({videos:videos})
    }
    else
    {
      res.status(204)
    }
  } catch (error) {
    res.status(500)
  }
};

//************************************************************************************************************************

// production getAudios api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/audios
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const GetAudios = async (req, res) => {
  try {
    const audios=await audioModel.find()

    if(audios && audios.length>0)
    {
      res.status(200).json({audios:audios})
    }
    else
    {
      res.status(204)
    }
  } catch (error) {
    res.status(500)
  }
};

//************************************************************************************************************************

// production getAudios api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/audios
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const GetProductions = async (req, res) => {
  const productions=await productionModel.find().populate("videos").populate("audios")
  console.log(productions);
  if(productions && productions.length > 0)
  {
    res.status(200).json(productions)
  }
  else{
    console.log("inside else");
    res.status(204).json({message:"no productions to verify"})
  }
  
};

//************************************************************************************************************************

// production getAudios api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/audios
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const MakeVideoPrime = async (req, res) => {
  const {videoID}=req.body
  console.log(videoID)

  try {
    const video=await videoModel.findByIdAndUpdate(videoID,{$set:{isPrime:true}})

  if(video){
    res.status(200).json({
      message:"video marked prime"
    })
  }
  } catch (error) {
    console.log(error)

    res.status(500)
  }
  
};

//************************************************************************************************************************

// production getAudios api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/audios
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const MakeAudioPrime = async (req, res) => {
  const {audioID}=req.body
  console.log(audioID)

  try {
    const audio=await audioModel.findByIdAndUpdate(audioID,{$set:{isPrime:true}})

  if(audio){
    res.status(200).json({
      message:"audio marked prime"
    })
  }
  } catch (error) {
    console.log(error)

    res.status(500)
  }
  
};