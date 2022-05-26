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
    
    function euclideandistance(x1,x2,y1,y2,z1,z2){
        return Math.sqrt((x2-x1)^2+(y2-y1)^2+(z2-z1)^2)
    }
        let landmarks
    
        //used for eye ratio
        let left_eye_top
        let left_eye_bottom
        let left_eye_right
        let left_eye_left
        //used for eye ratio
        let right_eye_top 
        let right_eye_bottom
        let right_eye_right
        let right_eye_left
        //used for general face shape
        let midpoint_between_eyes
        let chin_gnathion
        let left_ear_tragion
        let right_ear_tragion
        //used for cheek location as a function of chin
        let left_cheek_center
        let right_cheek_center
        let left_chin_gonion
        let right_chin_gonion
        //used for general nose shape
        let nose_tip
        let nose_bottom_right
        let nose_bottom_left
        let nose_bottom_center
    
        let upper_lip
        let lower_lip
        let mouth_left
        let mouth_right
        let mouth_center
    
        let forehead_gabella
 
    return {imageInformation, originalImageSize}
}


router.get("/facelandmark", async (req, res, next) =>  {
    let response = await facelandmark()
    res.send(response)
  });
  
  module.exports = router;