import { audioModel } from "../DB/models/audio_model.js";
import { productionModel } from "../DB/models/production_model.js";
import { videoModel } from "../DB/models/video_model.js";

// production sign-up api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/auth/signup
// expecting req body properties : - {email,mobile,password}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const ProductionSignUp = (req, res) => {
  console.log("api hits");
  //destructuring request body
  const { email, mobile, password } = req.body;
  console.log(req.body);

  //creating productionModel instance to store production document to ott database
  const production = new productionModel({
    email: email,
    password: password,
    mobile: mobile,
  });

  //Saving document to the collection => productions
  production.save();

  res.status(201).json({
    msg: "production signup success",
  });
};

//************************************************************************************************************************

// production login api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/auth/login
// expecting req body properties : - {email,password}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const ProductionLogin = async (req, res) => {
  //destructuring request body
  const { email, password } = req.body;

  const productionData = await productionModel.findOne({ email: email });

  if (productionData && productionData.password === password) {
    res.status(200).json({
      productionData,
    });
  } else {
    res.status(401).json({
      message: "invalid credentials",
    });
  }
};

//************************************************************************************************************************

// production details api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/auth/details
// expecting req body properties : - {companyName,regID,address,website,productionID}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const ProductionDetails = async (req, res) => {
  //destructuring request body
  const { companyName, regID, address, website, productionID } = req.body;
  console.log(req.body);
  try {
    await productionModel.findByIdAndUpdate(productionID, {
        $set:{
            companyName,
            regID,
            address,
            website
        }
      })
    
      const production=await productionModel.findById(productionID)

      res.status(200).json({
        production
      })
  } catch (error) {
    console.log(error);

    res.status(500).json({
        msg:"internal server error"
    })
  }

  
};


//************************************************************************************************************************

// production verification api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/auth/verify
// expecting req body properties : - {productionID}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const ProductionVerification = async (req, res) => {
    //destructuring request body
    const {productionID } = req.body;
    console.log(req.body);
    
    const production=await productionModel.findById(productionID)

    if(production && production.isVerified==true)
    {
        res.status(200).json({
            verified:true
        })
    }
    else
    {
        res.status(401).json({
            message:"verification pending"
        })
    }
  };
  

  //************************************************************************************************************************

// production video upload api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/upload
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const ProductionVideoUpload = async (req, res) => {
  //destructuring request body
  const mediaFiles = req.files;
  console.log(mediaFiles);
  const fileName=`/videos/${mediaFiles.selectedFile[0].filename}`
  console.log(fileName)
  const thumbnail=`/videos/${mediaFiles.thumbnail[0].filename}` 
  console.log(thumbnail);
  const {title,description,language,genre,releaseYear,productionID}=req.body
  console.log(req.body);
  const video=new videoModel({
    fileName,
    thumbnail,
    title,
    description,
    language,
    genre,
    releaseYear,
    production:productionID,
    isPrime:false
  })

  const videoDetail=await video.save()
  if(videoDetail){
    await productionModel.findByIdAndUpdate(productionID,{$push:{videos:videoDetail._id}})
    res.status(200).json({
      msg:"video uploaded"
    })
  }
  else{
    res.status(500).json({
      msg:"Internal server error"
    })
  }
};

  //************************************************************************************************************************

// production audio upload api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/upload
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const ProductionAudioUpload = async (req, res) => {
  //destructuring request body
  const mediaFiles = req.files;
  console.log(mediaFiles);
  const {title,description,genre,releaseYear,productionID}=req.body
  const fileName=`/audios/${mediaFiles.selectedFile[0].filename}`
  console.log(fileName)
  const thumbnail=`/audios/${mediaFiles.thumbnail[0].filename}` 
  console.log(thumbnail);
  console.log(req.body);

  const audio=new audioModel({
    fileName,
    thumbnail,
    title,
    description,
    genre,
    releaseYear,
    production:productionID,
    isPrime:false
  })

  const audioDetail=await audio.save()
  if(audioDetail){
    await productionModel.findByIdAndUpdate(productionID,{$push:{audios:audioDetail._id}})
    res.status(200).json({
      msg:"audio uploaded"
    })
  }
  else{
    res.status(500).json({
      msg:"Internal server error"
    })
  }
};

  //************************************************************************************************************************

// production getVideos api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/videos
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const ProductionVideos = async (req, res) => {
  console.log("Api hits");
  //destructuring request body
  const {productionID}=req.body
  console.log(productionID);

  try {
    const productionDetails=await productionModel.findById(productionID).populate("videos")
    const videos=productionDetails.videos
    console.log(videos);
  
    if(productionDetails && videos.length>0)
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

//************************************************************************************************************************

// production getAudios api
//----------------------------------------------------------------------------------
// api_url                       :- http://localhost:5000/api/production/audios
// expecting req body properties : - {}
// content-type                  :- JSON
//----------------------------------------------------------------------------------
export const ProductionAudios = async (req, res) => {
  //destructuring request body
  const {productionID}=req.body

  try {
    const productionDetails=await productionModel.findById(productionID).populate("audios")
    const audios=productionDetails.audios
    console.log(audios);
  
    if(productionDetails && audios.length>0)
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

