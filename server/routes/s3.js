const express = require("express");
const router = express.Router();
var debug = require("debug")("server:routes");
require("dotenv").config();
const multer = require("multer");
const { uploadFile } = require("../db/models/s3Model");
const addUrl = require("../db/models/urlmodel");
const {
  facelandmark,
  facelandmarkURL,
} = require("../db/models/faceDetectionCalc.js");
const sharp = require("sharp");
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const util = require("util");
const Product = require("../db/models/productModel.js");
// const unlinkFile = util.promisify(fs.unlink);

const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadProduct = multer({ dest: "uploads/" });


// upload image to vision, S3 and MongoDB
router.post("/upload", upload.single("image"), async (req, res, next) => {
  const file = req.file;
 
  // resize and send to google vision
  await sharp(file.buffer)
    .resize(900, 900, { withoutEnlargement: true })
    .toBuffer()
    .then(async (resized) => {
      const buffer = resized;

      const products = await Product.find();

      const resultVision = await facelandmark(buffer, products);
      res.send(resultVision);
    });
  res.status("Successfully uploaded!");
});

// upload image from webcam to vision
router.post(
  "/uploadwebcam",
  upload.single("image"),
  async (req, res, next) => {
    const file = req.body.image;
    const matches = file.replace(/^data:image\/(png);base64,/, "");
    const buff = Buffer.from(matches, "base64");

    const products = await Product.find();

    const resultVision = await facelandmark(buff, products);

    res.send(resultVision);
    res.status("Successfully uploaded!");
  }
);

// upload Url to vision
router.post("/uploadurl", async (req, res, next) => {
  const urlBody = req.body.URL;
  
  const products = await Product.find();

  const resultVision = await facelandmarkURL(urlBody,products);

  res.send(resultVision);
  
});

// upload product image to S3
router.post(
  "/uploadproductimage",
  uploadProduct.single("image"),
  async (req, res, next) => {
    const file2 = req.file;
    console.log("file2 is", file2);
    const file2Name = req.file.filename + ".jpg";
    const fileToDelete = req.body.oldImageS3Key;

    // resize and send to s3
    await sharp(file2.path)
      .resize(900, 900, { withoutEnlargement: true })
      .toFile(`resized/${file2Name}`)
      .then(async (file) => {
        const result = await uploadFile(file2);

        const deleteS3 = await s3
          .deleteObject({ Key: fileToDelete, Bucket: bucketName })
          .promise();

        // await unlinkFile(file2.path);
        // await unlinkFile(`resized/${file2Name}`);
        res.send({ image: result.Location, imageS3Key: result.Key });
      });
  }
);

router.post(
  "/uploadadditionalimage",
  uploadProduct.single("image"),
  async (req, res, next) => {
    const file2 = req.file;
    console.log("file2 is", file2);
    const file2Name = req.file.filename + ".jpg";
    const fileToDelete = req.body.oldImageS3KeyA;
    console.log("fileToDelete is", fileToDelete);
   
    // resize and send to s3
    await sharp(file2.path)
      .resize(900, 900, { withoutEnlargement: true })
      .toFile(`resized/${file2Name}`)
      .then(async (file) => {
        const result = await uploadFile(file2);
        console.log("result is", result.Location, result.Key);
      
        // await unlinkFile(file2.path);
        // await unlinkFile(`resized/${file2Name}`);
        res.send({ images: result.Location, additionalS3: result.Key });
      })
      
      // if (fileToDelete !== "") {
      //   const deleteS3 = await s3
      //   .deleteObject({ Key: fileToDelete, Bucket: bucketName })
      //   .promise();
      // }
     
  });

module.exports = router;
