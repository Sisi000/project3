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

const { Schema, model } = mongoose;

const photoSchema = new Schema({
  location: String,
});

const Photo = model("Photo", photoSchema);

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

const storage=multer.memoryStorage()

const upload = multer({
storage: storage,
limits: { fieldSize: 25 * 1024 * 1024 },
});

router.post(
"/",
[    upload.array("images", config.get("maxImageCount")),
 imageResize,
],
async (req, res) => {
const paths = await req.files.map((file) => ({ originalName: file.originalname}));
await Post.create({
    title: req.body.title,
    userId: req.body.userId,
    Post_Images: paths.map((x) => ({ images: x.originalName })),
},
{ 
include: [Post_Image] }).then(
res.status(201).send())


module.exports = async (req, res, next) => {
// router.post("/upload", upload.single("image"), async (req, res, next) => {
  // console.log("Uploaded file is", req.file.buffer); // Print upload details
  const images = [];

  const resizePromises = req.files.map(async (file) => {
  console.log(file)
  // const buffer = req.file.buffer;
  // const resultVision = await facelandmark(buffer);
  // console.log("resultVision is", resultVision);

  await sharp(file.buffer)
  .resize(1000, 1000)
  .toBuffer()
  .then(resized=>s3.upload({
    Bucket: "project3inc",
    Key:file.originalname + "_thumb.jpg",
    Body:file.buffer,
    ACL: 'public-read'
  }).promise())

  images.push(file.originalname);
});

await Promise.all([...resizePromises]);

req.images = images;

next();
    // res.send(resultVision);
  });

  
  router.get("/images/:key", (req, res) => {
    console.log(req.params);
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  });

  module.exports = router;
