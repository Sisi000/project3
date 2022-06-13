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
    "data":[2.4836,1.1581,0.7601,1.9322],
    "information":{
        "color":"blue",
        "prescription":[0,8],}//min size = 0, max size 10
    },//Brad Pitt
    {"type":"Glasses 2",
    "data":[2.2740,1.2698,0.8955,2.2307],
    "information":{
        "color":"red",
        "prescription":[0,5],}
    },//BTS
    {"type":"Glasses 3",
    "data":[2.4132,1.0822,0.8577,1.9868],
    "information":{
        "color":"brown",
        "prescription":[0,7],}
    },//Denzel Washington
    {"type":"Glasses 4",
    "data":[2.3881,1.1532,0.7524,2.0369],
    "information":{
        "color":"black",
        "prescription":[0,10],}
    },//Dwayne Johnson
    {"type":"Glasses 5",
    "data":[2.4372,1.2571,0.7567,1.8846],
    "information":{
        "color":"black",
        "prescription":[0,10],}
    },//Eminem
    {"type":"Glasses 6",
    "data":[2.3847,1.2567,0.7788,2.1247],
    "information":{
        "color":"blue",
        "prescription":[0,7],}
    },//Gordon Ramsey
    {"type":"Glasses 7",
    "data":[2.3088,1.2542,0.7389,2.0332],
    "information":{
        "color":"brown",
        "prescription":[0,10],}
    },//Justin Trudeau
    {"type":"Glasses 8",
    "data":[2.0897,1.2618,0.7698,1.9015],
    "information":{
        "color":"black",
        "prescription":[0,9],}
    },//Christian Ronaldo
    {"type":"Glasses 9",
    "data":[2.3786,1.1987,0.7553,2.1600],
    "information":{
        "color":"grey",
        "prescription":[0,4],}
    },//Serena Williams
    {"type":"Glasses 10",
    "data":[2.1103,1.2603,0.7584,2.1184],
    "information":{
        "color":"red",
        "prescription":[0,10],}
    },//Shakira
]

function merge(left, right){
    let results=[]
        //Break out of loop if any of the array gets empty
        while(left.length && right.length){
            if(left[0][0] < right[0][0]){//left less than right
                results.push(left.shift())
            }else{//right less than left
                results.push(right.shift())
            }
        }
    return [...results, ...left, ...right]//either left or right is empty, so this is sorted
}

function mergesort(array){

    if(array.length ===1){
        return array
    }
    let mid = Math.floor((array.length)/2)
    let left = array.slice(0, mid)//slice returns everything from 0 UP TO (but not including) center
    let right = array.slice(mid)//takes center to end of array

    return merge(mergesort(left), mergesort(right))
}



function euclideandistance(x1,y1,z1,x2,y2,z2){
    return Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2)
}

function glassesToUserDataCalc (glassesData, userData){//calculated euclidian distance from user data to glasses data
    if(glassesData.length != userData.length){
        return res.json(`problem with the user calculation`); 
    }
    let sum = 0
    for(let i=0; i<userData.length; i++){
        sum = (glassesData[i]-userData[i])**2+sum
    }
    return Math.sqrt(sum)
}

function glassesDataReturn(glassesData, userData, n=10){
    let results = []
    for(let i=0; i<glassesData.length; i++){
        let result = glassesToUserDataCalc(glassesTestData[i].data, userData)
        results.push([result,glassesTestData[i].type])
    }
    return results
}

function calculateUserData(imageInformation){
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
    
    return userData=[eyeRatioHorrizvsVertRatio,earsToFaceHorrizvsVertRatio,cheekVsChinHorizRatio,noseWidthvsHeightRatio]
}

async function facelandmark(req, res, next) {

    async function setEndpoint(request) {
        try{
            const result = await client.faceDetection(request);
            //console.log(result)
            return result
        } catch(error) {
            //console.log(error);
            return res.status(500).json(`problem with the Google API`);
        }
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

    let userData = calculateUserData(imageInformation)
    let rawResults = glassesDataReturn(glassesTestData,userData)
    let results = mergesort(rawResults)

    console.log("This is the unordered list: ", rawResults)
    console.log("This is the ordered list: ",results)
    
    return {results, originalImageSize}
}

async function facelandmarkURL(req, res, next) {
    //Image URL for google - Requires body to have a key value pair URL:<URL>
    let imageURL = req
    //Image original size for google - Checked on front end prior to submit - Requires body to have a key value pair originalImageSize:<originalImageSize> 
    //let originalImageSize = req.body.originalImageSize;

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

    //Client uses URL instead of image for upload
    const clientOptions = {apiEndpoint: 'eu-vision.googleapis.com'};
    // Creates a client
    const client = new vision.ImageAnnotatorClient(config, clientOptions);

    let imageInformation = await setEndpoint(imageURL);

    let userData = calculateUserData(imageInformation)
    let rawResults = glassesDataReturn(glassesTestData,userData)
    let results = mergesort(rawResults)

    console.log("This is the unordered list: ", rawResults)
    console.log("This is the ordered list: ",results)
    
    return {results}
}

module.exports = {
    facelandmark,
    facelandmarkURL
}