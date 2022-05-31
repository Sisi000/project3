const express = require("express");
const router = express.Router();
// var debug = require("debug")("server:routes");
const multer = require("multer");
const s3Storage = require("multer-sharp-s3");
const aws = require("aws-sdk");
const { uploadFile, getFileStream } = require("../db/models/s3Model");
// const s3 = new aws.S3();
const mongoose = require("../db/mongoose");
const { facelandmark } = require("../db/models/faceDetectionCalc.js");
const sharp = require("sharp");
const S3 = require('aws-sdk/clients/s3')
const fs = require("fs");
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)


const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
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

// const upload2 = multer({ storage: storage2 });
const upload = multer({ dest: 'uploads/' })
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

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

  // mongodb
  // const result = await Photo.create({ location: req.file.Location });
  // console.log("result is", result);
  const file2 = req.file;
  console.log("file is", file2);
  // const fileBuffer = Buffer.from(file.filename)
  // console.log("fileBuffer is", fileBuffer);

  await sharp(file2.path)
    .resize(900, 900)
    .toBuffer()
    .then(async (resized) => {
      const buffer = resized;
      const resultVision = await facelandmark(buffer);
      console.log("resultVision is", resultVision);
    });
    
    await sharp(file2.path)
    .resize(900, 900)
    .toFile(`resized/${file2.filename}`)
    // .toBuffer()
    .then(async (file) => {
      const result = await uploadFile(file2);
      
    await unlinkFile(file2.path)
    console.log(file)

    })
    
  res.send("Successfully uploaded!");
});

module.exports = router;
