const vision = require('@google-cloud/vision');
const sizeOf = require("image-size");
const fs = require ('fs');
//const uploadLocation="./testimages/"; ->Remove, using Jest now
//const fname = "testimage.jpg" ->Remove, using Jest now

var config = {credentials:
    {
        client_email:process.env.GOOGLE_API_EMAIL,
        private_key:process.env.GOOGLE_API_KEY,
    }
};

let glassesTestData=[
    {"type":"Glasses 1",
    "data":[2.1,1.2,0.8,2.0]},
    {"type":"Glasses 2",
    "data":[2.0,1.4,0.7,1.9]},
    {"type":"Glasses 3",
    "data":[2.2,1.1,0.9,2.1]},
    {"type":"Glasses 4",
    "data":[2.3,1.25,0.75,2.1]},
    {"type":"Glasses 5",
    "data":[2.05,1.15,0.85,2.1]},
    {"type":"Glasses 6",
    "data":[2.2,1.3,0.9,1.85]},
    {"type":"Glasses 7",
    "data":[2.05,1.05,0.95,2.15]},
    {"type":"Glasses 8",
    "data":[2.15,1.15,0.85,2.05]},
    {"type":"Glasses 9",
    "data":[2.2,1.25,0.75,2.05]},
    {"type":"Glasses 10",
    "data":[2.1,1.25,0.65,2.2]},
]

async function facelandmark(req, res, next) {

    function euclideandistance(x1,y1,z1,x2,y2,z2){
        return Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2)
    }

    async function setEndpoint(request) {
        try{
            const result = await client.faceDetection(request);
            console.log(result)
            return result
        } catch(error) {
            console.log(error);
            return res.status(500).json(`problem with the Google API`);
        }
    }

    function glassesToUserDataCalc (glassesData, userData){
        if(glassesData.length != userData.length){
            return res.json(`problem with the user calculation`); 
        }
        let sum = 0
        for(let i=0; i<userData.length; i++){
            sum = (glassesData[i]-userData[i])**2+sum
        }
        return Math.sqrt(sum)
    }


    const client = new vision.ImageAnnotatorClient(config);
    //test for upload - needed for encode
    var imageFileUpload = req //fs.readFileSync(uploadLocation+fname); Remove, using Jest now
    //defines internal file 
    var imageB64Upload = Buffer.from(imageFileUpload).toString('base64');
    const request = {
        image: {
            content: Buffer.from(imageB64Upload, 'base64')
        }
    };  
    let originalImageSize = sizeOf(req);
    let imageInformation = await setEndpoint(request);

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
    
    let userData=[eyeRatioHorrizvsVertRatio,earsToFaceHorrizvsVertRatio,cheekVsChinHorizRatio,noseWidthvsHeightRatio]
    let glassesEuDistanceMin
    let glassesType

    //I should really normalize the eculidian distance so we have equal weighting, or we can throw factors into the calculation for heavier weighted factors
    for(let i = 0; i < glassesTestData.length; i++){
        let glassesTest = glassesToUserDataCalc(glassesTestData[i].data,userData)
        console.log(`This is the Euclid Dist for ${glassesTestData[i].type} : ${glassesTest}`)
        if(!glassesEuDistanceMin || glassesTest < glassesEuDistanceMin){
            glassesEuDistanceMin = glassesTest
            glassesType = glassesTestData[i].type
        }
    }

    console.log("This is the suggest glasses type: ", glassesType)
    
    return {imageInformation, originalImageSize, glassesType}
}

async function facelandmarkURL(req, res, next) {
    //Image URL for google - Requires body to have a key value pair URL:<URL>
    let imageURL = req
    //Image original size for google - Checked on front end prior to submit - Requires body to have a key value pair originalImageSize:<originalImageSize> 
    //let originalImageSize = req.body.originalImageSize;

    function euclideandistance(x1,y1,z1,x2,y2,z2){
        return Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2)
    }

    async function setEndpoint(imageURL) {
        try{
            const result = await client.faceDetection(`${imageURL}`);
            console.log(result)
            return result
        } catch(error) {
            console.log(error);
            return res.status(500).json(`problem with the Google API`);
        }
    }

    function glassesToUserDataCalc (glassesData, userData){
        if(glassesData.length != userData.length){
            return res.json(`problem with the user calculation`); 
        }
        let sum = 0
        for(let i=0; i<userData.length; i++){
            sum = (glassesData[i]-userData[i])**2+sum
        }
        return Math.sqrt(sum)
    }

    //Client uses URL instead of image for upload
    const clientOptions = {apiEndpoint: 'eu-vision.googleapis.com'};
    // Creates a client
    const client = new vision.ImageAnnotatorClient(config, clientOptions);

    let imageInformation = await setEndpoint(imageURL);

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
    
    let userData=[eyeRatioHorrizvsVertRatio,earsToFaceHorrizvsVertRatio,cheekVsChinHorizRatio,noseWidthvsHeightRatio]
    let glassesEuDistanceMin
    let glassesType

    //I should really normalize the eculidian distance so we have equal weighting, or we can throw factors into the calculation for heavier weighted factors
    for(let i = 0; i < glassesTestData.length; i++){
        let glassesTest = glassesToUserDataCalc(glassesTestData[i].data,userData)
        console.log(`This is the Euclid Dist for ${glassesTestData[i].type} : ${glassesTest}`)
        if(!glassesEuDistanceMin || glassesTest < glassesEuDistanceMin){
            glassesEuDistanceMin = glassesTest
            glassesType = glassesTestData[i].type
        }
    }

    console.log("This is the suggest glasses type: ", glassesType)
    
    return {imageInformation}
}

module.exports = {
    facelandmark,
    facelandmarkURL
}