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
    
    // console.log(left_eye_top.x, left_eye_top.y, left_eye_top.z)
    // console.log(left_eye_top)
    // console.log(left_eye_bottom)
    // console.log(left_eye_right_corner)
    // console.log(left_eye_left_corner)
    let leftEyeVertD=euclideandistance(left_eye_top.x, left_eye_top.y, left_eye_top.z,left_eye_bottom.x, left_eye_bottom.y, left_eye_bottom.z)
    let leftEyeHorrizD=euclideandistance(left_eye_right_corner.x, left_eye_right_corner.y, left_eye_right_corner.z,left_eye_left_corner.x, left_eye_left_corner.y, left_eye_left_corner.z)
    let rightEyeVertD=euclideandistance(right_eye_top.x, right_eye_top.y, right_eye_top.z,right_eye_bottom.x, right_eye_bottom.y, right_eye_bottom.z)
    let rightEyeHorrizD=euclideandistance(right_eye_right_corner.x, right_eye_right_corner.y, right_eye_right_corner.z,right_eye_left_corner.x, right_eye_left_corner.y, right_eye_left_corner.z)
    let rightEyeHorrizvsVertRatio=rightEyeHorrizD/rightEyeVertD
    let leftEyeHorrizvsVertRatio=leftEyeHorrizD/leftEyeVertD
    let eyeRatioHorrizvsVertRatio=(leftEyeHorrizvsVertRatio+rightEyeHorrizvsVertRatio)/2

    let earToEarHorizontal=euclideandistance(left_ear_tragion.x, left_ear_tragion.y, left_ear_tragion.z,right_ear_tragion.x, right_ear_tragion.y, right_ear_tragion.z)
    let betweenEyesToChinVert=euclideandistance(midpoint_between_eyes.x, midpoint_between_eyes.y, midpoint_between_eyes.z,chin_gnathion.x, chin_gnathion.y, chin_gnathion.z)
    let earsToFaceHorrizvsVertRatio=earToEarHorizontal/betweenEyesToChinVert

    let cheekToCheekHorizD=euclideandistance(left_cheek_center.x, left_cheek_center.y, left_cheek_center.z,right_cheek_center.x, right_cheek_center.y, right_cheek_center.z)
    let chinPointHorizD=euclideandistance(right_chin_gonion.x, right_chin_gonion.y, right_chin_gonion.z,left_chin_gonion.x, left_chin_gonion.y, left_chin_gonion.z)
    let cheekVsChinHorizRatio=cheekToCheekHorizD/chinPointHorizD

    let noseLeftToRightHorizD=euclideandistance(nose_bottom_right.x, nose_bottom_right.y, nose_bottom_right.z,nose_bottom_left.x, nose_bottom_left.y, nose_bottom_left.z)
    let nodeTipToBottomVertD=euclideandistance(nose_bottom_center.x, nose_bottom_center.y, nose_bottom_center.z,nose_tip.x, nose_tip.y, nose_tip.z)
    let noseWidthvsHeightRatio=noseLeftToRightHorizD/nodeTipToBottomVertD

    // console.log("Euclidiean distance for vertical left eye dimension: ", leftEyeVertD)
    // console.log("Euclidiean distance for horizontal left eye dimension: ", leftEyeHorrizD)
    // console.log("The ratio of horizontal/vertical left eye dimensions is: ", leftEyeHorrizvsVertRatio)
    // console.log("The ratio of horizontal/vertical right eye dimensions is: ", rightEyeHorrizvsVertRatio)
    console.log("The avg ratio of horizontal/vertical eye dimensions is: ", eyeRatioHorrizvsVertRatio)

    console.log("The ratio of horizontal/vertical ear to ear vs between eyes to chin is: ", earsToFaceHorrizvsVertRatio)

    console.log("The ratio of horizontal/horizontal cheek to cheek vs chin to chin is: ", cheekVsChinHorizRatio)

    console.log("The ratio of horizontal/horizontal nose width vs height is: ", noseWidthvsHeightRatio)
    return {imageInformation, originalImageSize}
}


router.get("/facelandmark", async (req, res, next) =>  {
    let response = await facelandmark()
    res.send(response)
  });
  
  module.exports = router;