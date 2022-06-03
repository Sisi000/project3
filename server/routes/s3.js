const express = require("express");
const router = express.Router();
require("dotenv").config();
const multer = require("multer");
const { uploadFile, getFileStream } = require("../db/models/s3Model");
const mongoose = require("../db/mongoose");
const { facelandmark } = require("../db/models/faceDetectionCalc.js");
const sharp = require("sharp");
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const util = require("util");
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

router.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

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
      console.log("resultVision is", resultVision);
    })
    .catch((err) => console.log(err.message));

  // resize and send to s3
  await sharp(file2.path)
    .resize(900, 900, { withoutEnlargement: true })
    .toFile(`resized/${file2Name}`)
    .then(async (file) => {
      const result = await uploadFile(file2);
      console.log("result is", result).catch((err) => console.log(err.message));

      // mongodb
      const resultMongo = await Photo.create({ location: result.Location });
      console.log("resultMongo is", resultMongo);
      await unlinkFile(file2.path);
      console.log(file);
    });

  res.send("Successfully uploaded!");
});

module.exports = router;
