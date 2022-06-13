const express = require("express");
const router = express.Router();
var debug = require("debug")("server:routes");
require("dotenv").config();
const multer = require("multer");
const { uploadFile, getFileStream } = require("../db/models/s3Model");
const addUrl = require("../db/models/urlmodel");
const mongoose = require("../db/mongoose");
const {
  facelandmark,
  facelandmarkURL,
} = require("../db/models/faceDetectionCalc.js");
const sharp = require("sharp");
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const util = require("util");
const Product = require("../db/models/productModel");
const unlinkFile = util.promisify(fs.unlink);

const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// const upload2 = multer({ storage: storage2 });
const upload = multer({ dest: "uploads/" });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const { Schema, model } = mongoose;

const photoSchema = new Schema({
  location: String,
});

const Photo = model("Photo", photoSchema);

const visionSchema = new Schema({
  result: Object,
});

const Vision = model("Vision", visionSchema);

// get image from S3 by key
router.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

// upload image to vision, S3 and MongoDB
router.post("/upload", upload.single("image"), async (req, res, next) => {
  const file2 = req.file;
  const file2Name = req.file.filename + ".jpg";
  console.log("file is", file2);

  // resize and send to google vision
  await sharp(file2.path)
    .resize(900, 900, { withoutEnlargement: true })
    .toBuffer()
    .then(async (resized) => {
      const buffer = resized;
      const resultVision = await facelandmark(buffer);
      // console.log("resultVision is", resultVision);
      const resultMongoVision = await Vision.create({ result: resultVision });
      // console.log("VisionMongo is", resultMongoVision);
      res.send(resultVision);
    });

  // resize and send to s3
  await sharp(file2.path)
    .resize(900, 900, { withoutEnlargement: true })
    .toFile(`resized/${file2Name}`)
    .then(async (file) => {
      const result = await uploadFile(file2);

      // mongodb
      const resultMongo = await Photo.create({ location: result.Location });
      // console.log("resultMongo is", resultMongo);
      await unlinkFile(file2.path);
      await unlinkFile(`resized/${file2Name}`);
      // console.log(file);
    });

  res.status("Successfully uploaded!");
});

// upload Url to vision and mongoDB
router.post("/uploadurl", async (req, res, next) => {
  const urlBody = req.body.URL;
  console.log("urlBody is", urlBody);

  const resultVision = await facelandmarkURL(urlBody);

  const uploadedUrl = await addUrl({URL: urlBody});
  console.log("Added url is", uploadedUrl);
  res.send(resultVision);
});

router.post("/uploadproductimage", upload.single("image"), async (req, res, next) => {
  const file2 = req.file;
  const file2Name = req.file.filename + ".jpg";
  console.log("file is", file2);

    // resize and send to s3
  await sharp(file2.path)
    .resize(900, 900, { withoutEnlargement: true })
    .toFile(`resized/${file2Name}`)
    .then(async (file) => {
      const result = await uploadFile(file2);
      console.log("result is", result);

      // mongodb
      const resultMongo = await Product.updateOne({ image: result.Location });
      console.log("resultMongo is", resultMongo);
      // await unlinkFile(file2.path);
      // await unlinkFile(`resized/${file2Name}`);
      // console.log(file);
      res.send({image: result.Location});
    });

});


module.exports = router;
