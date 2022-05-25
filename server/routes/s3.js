const express = require("express");
const router = express.Router();
const multer = require("multer");
const s3Storage = require("multer-sharp-s3");
const aws = require("aws-sdk");
const { getFileStream } = require("../db/models/s3model");

const s3 = new aws.S3();

// const app = express();

const storage = s3Storage({
  s3,
  Bucket: "project3inc",
  resize: {
    width: 400,
    height: 400,
  },
  max: true,
});

const upload = multer({ storage: storage });

router.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

router.post("/upload", upload.single("image"), (req, res, next) => {
  console.log(req.file); // Print upload details
  res.send("Successfully uploaded!");
});

module.exports = router;
