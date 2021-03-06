const vision = require('@google-cloud/vision');
const sizeOf = require("image-size");

var config = {credentials:
    {
        client_email:process.env.GOOGLE_API_EMAIL.replace(/\\n/g, '\n'),
        private_key:process.env.GOOGLE_API_KEY.replace(/\\n/g, '\n'),
    }
};

//console.log("Google Config: ",config)

/*
filter is a function to filter results
*/
function filter (glasssesData, remove=null, required=null, minimum=null, maximum=null){ //default is null = no filters
    if(remove){
        for(let key in remove){//remove from que
            if(remove[key]){
                for(let item of remove[key]){
                    if(glasssesData[key] === item){
                        return false
                    }
                }           
            }
        }
    }
    if(required){
        let pass = false
        for(let key in required){//required in que
            if(required[key]){
                for(let item of required[key]){
                    if(glasssesData[key] === item){
                        pass = true
                    }
                }
            }
        }
        if(!pass){
            return false
        }
    }
    if(minimum){
        for(let key in minimum){//minimum value for que
            if(minimum[key]){
                for(let item of minimum[key]){
                    //console.log(glasssesData[key])
                    if(glasssesData[key] < item){
                        return false
                    }
                }         
            }
        }
    }
    if(maximum){
        for(let key in maximum){//max value for que
            if(maximum[key]){
                for(let item of maximum[key]){
                    if(glasssesData[key] > item){
                        return false
                    }
                }    
            }     
        }
    }
    return true
}
/*
merge is the call for the merge function in mergesort
left and right are sorted arrays to be merged
*/
function merge(left, right){
    let results=[]
        //Break out of loop if any of the array gets empty
        while(left.length && right.length){
            if(left[0][0] < right[0][0]){//left less than right. Note that this checks values (the nested array)
                results.push(left.shift())
            }else{//right less than left
                results.push(right.shift())
            }
        }
    return [...results, ...left, ...right]//either left or right is empty, so this is sorted
}
/*
mergesort is the main function for the Mergesort
array is the initial unsorted array, breaks down and recurrses
*/
function mergesort(array){

    if(array.length ===1){
        return array
    }
    let mid = Math.floor((array.length)/2)
    let left = array.slice(0, mid)//slice returns everything from 0 UP TO (but not including) center
    let right = array.slice(mid)//takes center to end of array

    return merge(mergesort(left), mergesort(right))
}


/*
euclideandistance calculates the eclid distance, general algo called each time we want to determin the distance to nodes in 3-d
x1,y1,z1 => node 1 
x2, y2, z2 => node 2
*/
function euclideandistance(x1,y1,z1,x2,y2,z2){
    return Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2);
}
/*
glassesToUserDataCalc is a general calculation that does a euclid distance calculation of n-degrees, NOTE that both n1 and n2 have to be the same size (both inputs same dimensions) or this will fail (see error test)
glassesData is the general database data (entire thing)
userData is the users personal fit data (or personal data)
*/
function glassesToUserDataCalc (glassesData, userData){//calculated euclidian distance from user data to glasses data
    if(glassesData.length !== userData.length){
        return res.json(`problem with the user calculation`); 
    }
    let sum = 0;
    for(let i=0; i<userData.length; i++){
        sum = (glassesData[i]-userData[i])**2+sum;
    }
    return Math.sqrt(sum)
}
/*
glassesDataReturn does the calculation for the euclid distance for ranking the glasses. 
glassesData is the general database data (entire thing)
userData is the users personal fit data (or personal data)
n is the size of return. Default is shown. If no n is input, n here will be set to default
*/
function glassesDataReturn(glassesData, userData, dataRemove = null, dataRequired = null, dataMinimum = null, dataMaximum = null, n=3){
    let results = [];
    for(let i=0; i<glassesData.length; i++){
        let dataArray=[glassesData[i].eyeRatio, glassesData[i].earFaceRatio, glassesData[i].cheekChinRatio, glassesData[i].noseRatio] //fitting user data to [a,b,c,d] format
        if(filter(glassesData[i], dataRemove , dataRequired, dataMinimum, dataMaximum)){//filters inserted here, default is null. May need to destructure better
            let result = glassesToUserDataCalc(dataArray, userData)
            if(results.length<n){//if array is less than return requirements, push in
                results.push([result,glassesData[i]._id]);
            }else{//if array is == return requirements, we need to take out the largest one and replace with new value (if less than max)
                let maxLocation = 0;
                let max=results[0][0];

                for(let j=1; j<results.length; j++){
                    if(max<results[j][0]){
                        maxLocation=j;
                        max=results[j][0];
                    }
                }
                if(result<max){
                    results[maxLocation]=[result,glassesData[i]._id];
                }
            }
        }
    }

    return results
}
/*
calculateUserData destructures the landmarks into positions for calculations
*/
function calculateUserData(landmarks){
    console.log(landmarks[16])
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
    
    //ratios are calculated
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

    //unique user values calculated
    //console.log("The avg ratio of horizontal/vertical eye dimensions is: ", eyeRatioHorrizvsVertRatio)
    //console.log("The ratio of horizontal/vertical ear to ear vs between eyes to chin is: ", earsToFaceHorrizvsVertRatio)
    //console.log("The ratio of horizontal/horizontal cheek to cheek vs chin to chin is: ", cheekVsChinHorizRatio)
    //console.log("The ratio of horizontal/horizontal nose width vs height is: ", noseWidthvsHeightRatio)
    
    return userData=[eyeRatioHorrizvsVertRatio,earsToFaceHorrizvsVertRatio,cheekVsChinHorizRatio,noseWidthvsHeightRatio]
}


async function facelandmark(imageFile, dataBaseProducts, filters) {
    //Api function initialized for google vision
    async function setEndpoint(request) {
        try{
            const result = await client.faceDetection(request);

            return result
        } catch(error) {
            console.log(error);
            return error;
        }
    }
    //specifications for image upload to google vision
    const client = new vision.ImageAnnotatorClient(config);
    //test for upload - needed for encode
    var imageFileUpload = imageFile 
    //defines internal file 
    var imageB64Upload = Buffer.from(imageFileUpload).toString('base64');
    const request = {
        image: {
            content: Buffer.from(imageB64Upload, 'base64')
        }
    };  

    //console.log(filters)

    //To detemine the image size in case we want to show nodes
    let originalImageSize = sizeOf(imageFile);
    //API call being made
    let imageInformation = await setEndpoint(request);
    //Function to calculate unique user information
    let landmarks=imageInformation[0].faceAnnotations[0].landmarks
    let userData = calculateUserData(landmarks)
    //Unranked glasses for merge (with top n picks, UNORDERED)
    let rawResults = glassesDataReturn(dataBaseProducts,userData, filters.remove, filters.required, filters.minimum, filters.maximum)//No filters right now, add later
    //Mergesort being called (with top n picks, ORDERED)
    let results = mergesort(rawResults)

    //console.log("This is the unordered list: ", rawResults)
    //console.log("This is the ordered list: ",results)
    return results
}

async function facelandmarkURL(url, dataBaseProducts, filters) {
    //Image URL for google - Requires body to have a key value pair URL:<URL>
    let imageURL = url

    //Image original size for google - Checked on front end prior to submit - Requires body to have a key value pair originalImageSize:<originalImageSize> 

    async function setEndpoint(imageURL) {
        try{
            const result = await client.faceDetection(`${imageURL}`);
            
            return result
        } catch(error) {
            console.log(error);
            return error;
        }
    }

    //Client uses URL instead of image for upload
    const clientOptions = {apiEndpoint: 'eu-vision.googleapis.com'};
    // Creates a client
    const client = new vision.ImageAnnotatorClient(config, clientOptions);
    
    //API call being made
    let imageInformation = await setEndpoint(imageURL);

    //Function to calculate unique user information
    let landmarks=imageInformation[0].faceAnnotations[0].landmarks
    let userData = calculateUserData(landmarks)
    //Unranked glasses for merge (with top n picks, UNORDERED)
    let rawResults = glassesDataReturn(dataBaseProducts,userData, filters.remove, filters.required, filters.minimum, filters.maximum)//No filters right now, add later
    //Mergesort being called (with top n picks, ORDERED)
    let results = mergesort(rawResults)

    //console.log("This is the unordered list: ", rawResults)
    //console.log("This is the ordered list: ",results)
    
    return results
}

function tranformToGoogle(userFaceData){

    let userFaceData_Google = {
        landmarks: new Array(34).fill(0).map(()=> {return {position:null}})
    }
    //console.log(userFaceData_Google)

    userFaceData_Google.landmarks[16].position = userFaceData[386];
    userFaceData_Google.landmarks[18].position = userFaceData[374];
    userFaceData_Google.landmarks[17].position = userFaceData[362];
    userFaceData_Google.landmarks[19].position = userFaceData[263];
    //used for eye ratio
    userFaceData_Google.landmarks[20].position = userFaceData[159];
    userFaceData_Google.landmarks[22].position = userFaceData[145];
    userFaceData_Google.landmarks[21].position = userFaceData[133];
    userFaceData_Google.landmarks[23].position = userFaceData[33];
    //used for general face shape
    userFaceData_Google.landmarks[6].position = userFaceData[68];
    userFaceData_Google.landmarks[29].position = userFaceData[152];
    userFaceData_Google.landmarks[26].position = userFaceData[162];
    userFaceData_Google.landmarks[27].position = userFaceData[389];
    //used for cheek location as a function of chin
    userFaceData_Google.landmarks[32].position = userFaceData[427];
    userFaceData_Google.landmarks[33].position = userFaceData[207];
    userFaceData_Google.landmarks[30].position = userFaceData[148];
    userFaceData_Google.landmarks[31].position = userFaceData[377];
    //used for general nose shape
    userFaceData_Google.landmarks[7].position = userFaceData[4];
    userFaceData_Google.landmarks[13].position = userFaceData[459];
    userFaceData_Google.landmarks[14].position = userFaceData[239];
    userFaceData_Google.landmarks[15].position = userFaceData[19];

    console.log(userFaceData_Google.landmarks[16])
    
    return userFaceData_Google;
}
function facemesh(landmarks, dataBaseProducts, filters){

    //Function to calculate unique user information
    let userData = calculateUserData(landmarks)
    //Unranked glasses for merge (with top n picks, UNORDERED)
    let rawResults = glassesDataReturn(dataBaseProducts, userData, filters.remove, filters.required, filters.minimum, filters.maximum)//No filters right now, add later
    //Mergesort being called (with top n picks, ORDERED)
    let results = mergesort(rawResults)

    console.log("This is the unordered list: ", rawResults)
    console.log("This is the ordered list: ",results)

return results
}


module.exports = {
    tranformToGoogle,
    facemesh,
    facelandmark,
    facelandmarkURL,
    filter,
    merge,
    mergesort,
    euclideandistance,
    glassesToUserDataCalc,
    glassesDataReturn,
    calculateUserData
}