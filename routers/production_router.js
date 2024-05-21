import express from "express";
import {
  ProductionLogin,
  ProductionSignUp,
  ProductionDetails,
  ProductionVerification,
  ProductionVideoUpload,
  ProductionAudioUpload,
  ProductionVideos,
  ProductionAudios
} from "../controllers/production_controller.js";

const productionRouter = express.Router();

import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./videos/"); // Store videos||audios in the 'media' folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const audioStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./audios/"); // Store videos||audios in the 'media' folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const videoUpload = multer({ storage: videoStorage });
const audioUpload = multer({ storage: audioStorage });

const dir = dirname(fileURLToPath(import.meta.url));

productionRouter.post("/api/production/auth/signup", ProductionSignUp);
productionRouter.post("/api/production/auth/login", ProductionLogin);
productionRouter.post("/api/production/auth/details", ProductionDetails);
productionRouter.post("/api/production/auth/verify", ProductionVerification);
productionRouter.post(
  "/api/production/upload/video",
  videoUpload.fields([
    { name: "selectedFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  ProductionVideoUpload
);
productionRouter.post(
  "/api/production/upload/audio",
  audioUpload.fields([
    { name: "selectedFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  ProductionAudioUpload
);
productionRouter.post("/api/production/videos", ProductionVideos);
productionRouter.post("/api/production/audios", ProductionAudios);

export default productionRouter;
