const vision = require('@google-cloud/vision');
const express = require("express");
const sizeOf = require("image-size");
const fs = require ('fs');
const router = express.Router();
const uploadLocation="./testimages/";
const fname = "testimage.jpg" //Test image

var config = {credentials:
    {
        client_email:process.env.GOOGLE_API_EMAIL,
        private_key:process.env.GOOGLE_API_KEY,
    }
};

async function facelandmark(req, res, next) {
    const client = new vision.ImageAnnotatorClient(config);
    //test for upload - needed for encode
    var imageFileUpload = fs.readFileSync(uploadLocation+fname);
    //defines internal file 
    var imageB64Upload = Buffer.from(imageFileUpload).toString('base64');
    const request = {
        image: {
            content: Buffer.from(imageB64Upload, 'base64')
        }
    };  
    let originalImageSize = sizeOf(uploadLocation+fname);
    let imageInformation;
    async function setEndpoint() {
        try{
            const result = await client.faceDetection(request);
            imageInformation = result;
            console.log(result)
        } catch(error) {
            console.log(error);
            return res.status(500).json(`problem with the Google API`);
        }
    }
    await setEndpoint();
    
    function euclideandistance(x1,y1,z1,x2,y2,z2){
        return Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2)
    }

    let landmarks=imageInformation[0].faceAnnotations[0].landmarks
    //used for eye ratio
    let left_eye_top = landmarks[16].position
    let left_eye_bottom = landmarks[18].position
    let left_eye_right_corner = landmarks[17].position
    let left_eye_left_corner = landmarks[19].position
    //used for eye ratio
    let right_eye_top  = landmarks[20].position
    let right_eye_bottom = landmarks[22].position
    let right_eye_right_corner = landmarks[21].position
    let right_eye_left_corner = landmarks[23].position
    //used for general face shape
    let midpoint_between_eyes = landmarks[6].position
    let chin_gnathion = landmarks[29].position
    let left_ear_tragion = landmarks[26].position
    let right_ear_tragion = landmarks[27].position
    //used for cheek location as a function of chin
    let left_cheek_center = landmarks[32].position
    let right_cheek_center = landmarks[33].position
    let left_chin_gonion = landmarks[30].position
    let right_chin_gonion = landmarks[31].position
    //used for general nose shape
    let nose_tip = landmarks[7].position
    let nose_bottom_right = landmarks[13].position
    let nose_bottom_left = landmarks[14].position
    let nose_bottom_center = landmarks[15].position

    let upper_lip = landmarks[8].position
    let lower_lip = landmarks[9].position
    let mouth_left = landmarks[10].position
    let mouth_right = landmarks[11].position
    let mouth_center = landmarks[12].position

    let forehead_gabella = landmarks[28].position
    console.log(left_eye_top.x, left_eye_top.y, left_eye_top.z)
    console.log(left_eye_top)
    console.log(left_eye_bottom)
    console.log(left_eye_right_corner)
    console.log(left_eye_left_corner)
    leftEyeVertD=euclideandistance(left_eye_top.x, left_eye_top.y, left_eye_top.z,left_eye_bottom.x, left_eye_bottom.y, left_eye_bottom.z)
    leftEyeHorrizD=euclideandistance(left_eye_right_corner.x, left_eye_right_corner.y, left_eye_right_corner.z,left_eye_left_corner.x, left_eye_left_corner.y, left_eye_left_corner.z)
    console.log("Euclidiean distance for vertical left eye dimension: ", leftEyeVertD)
    console.log("Euclidiean distance for horizontal left eye dimension: ", leftEyeHorrizD)
    console.log("The ratio of vertical/horizontal left eye dimensions is: ", leftEyeVertD/leftEyeHorrizD)
    return {imageInformation, originalImageSize}
}


router.get("/facelandmark", async (req, res, next) =>  {
    let response = await facelandmark()
    res.send(response)
  });
  
  module.exports = router;