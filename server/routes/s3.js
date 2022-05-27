const express = require("express");
const router = express.Router();
// var debug = require("debug")("server:routes");
const multer = require("multer");
const s3Storage = require("multer-sharp-s3");
const aws = require("aws-sdk");
const { getFileStream } = require("../db/models/s3Model");
const s3 = new aws.S3();
const mongoose = require("../db/mongoose");
const { facelandmark } = require("../db/models/faceDetectionCalc.js");

// const storage = s3Storage({
//   s3,
//   Bucket: "project3inc",
//   resize: {
//     width: 1000,
//     height: 1000,
//     options: { withoutEnlargement: true },
//   },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { Schema, model } = mongoose;

const photoSchema = new Schema({
  location: String,
});

const Photo = model("Photo", photoSchema);

router.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});


router.post("/upload", upload.single("image"), async (req, res, next) => {
  console.log("Uploaded file is", req.file.buffer); // Print upload details
  // const result = await Photo.create({ location: req.file.Location });
  // console.log("result is", result);
  // res.send("Successfully uploaded!");
  const buffer = req.file.buffer;
  const resultVision = await facelandmark(buffer);
  console.log("resultVision is", resultVision);
  // const result = async () => {
  //   // const file = req.file;
  //   const result2 = upload2.single("image");
  //   console.log("result is", result2);
    res.send(resultVision);
});

module.exports = router;
