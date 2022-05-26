const express = require("express");
const router = express.Router();
var debug = require("debug")("server:routes");
const multer = require("multer");
const s3Storage = require("multer-sharp-s3");
const aws = require("aws-sdk");
const { addPhotoLocation, getFileStream } = require("../db/models/s3Model");
const s3 = new aws.S3();

const storage = s3Storage({
  s3,
  Bucket: "project3inc",
  resize: {
    width: 1000,
    height: 1000,
    options: { withoutEnlargement: true },
  },
});

const upload = multer({ storage: storage });

router.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

// router.get("/allimages", async (req, res) => {
//   try {
//     debug("getting all images");
//     const allImages = getAllImages();
//     res.send(allImages);
//   } catch (err) {
//     debug(err.message);
//   }
// });

router.post("/upload", upload.single("image"), (req, res, next) => {
  console.log(req.file); // Print upload details
  const location = req.file;
  console.log("location is", location);
  const result = addPhotoLocation(location);
  console.log("result is", result);
  res.send("Successfully uploaded!");
});

module.exports = router;
