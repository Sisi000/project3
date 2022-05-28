const express = require("express");
const router = express.Router();
require("dotenv").config();
const multer = require("multer");
const s3Storage = require("multer-sharp-s3");
const aws = require("aws-sdk");
const { uploadFile, getFileStream } = require("../db/models/s3Model");
const mongoose = require("../db/mongoose");
const { facelandmark } = require("../db/models/faceDetectionCalc.js");
const sharp = require('sharp');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


// const storage2 = s3Storage({
//   s3,
//   Bucket: "project3inc",
//   resize: {
//     width: 1000,
//     height: 1000,
//     options: { withoutEnlargement: true },
//   },
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// const upload2 = multer({ storage: storage2 });

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

// router.post("/upload", upload.single("image"), async (req, res, next) => {
router.post("/upload", multer().single("image"), (req, res, next) => {
  console.log("Uploaded file is", req.file.buffer); // Print upload details
  // const buffer = req.file.buffer;
  Promise.all([
    s3.upload({
      Bucket: "project3inc",
      Key: req.file.key,
      Body: req.file.buffer
    }),

       
    sharp(req.file.buffer)
      .resize(400, 300)
      .toBuffer()
      .then(buffer => {
        const resultVision = facelandmark(buffer)
        console.log(resultVision);
        // res.send(resultVision);
        // .promise()
    //  .then(toMongo => {

    //    const result = await Photo.create({ location: req.file.Location });
    //     }
      }
        ),
        
        
        // console.log("resultVision is", result);

  // const resultVision = await facelandmark(buffer);
  // const result = async () => {
    //   // const file = req.file;
    //   const result2 = upload2.single("image");
    //   console.log("result is", result2);
    // res.send("Successfully uploaded!");
  ])
  .then(() => res.send("Image uploaded!"))
  .catch(e => {
    console.warn(e) // debug this error
    res.status(500).send("Unable to upload images")
  })
});

module.exports = router;
