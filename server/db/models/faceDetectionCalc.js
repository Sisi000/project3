const vision = require('@google-cloud/vision');
const sizeOf = require("image-size");

var config = {credentials:
    {
        client_email:process.env.GOOGLE_API_EMAIL,
        private_key:process.env.GOOGLE_API_KEY,
    }
};

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
async function uploadImageTest(imageFile){//Used for generating user data with test

    async function setEndpoint(request) {
        try{
            const result = await client.faceDetection(request);

            return result
        } catch(error) {
            console.log(error);
            return res.status(500).json(`problem with the Google API`);
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

    let imageInformation = await setEndpoint(request);

    return imageInformation
}


async function facelandmark(imageFile, dataBaseProducts, filters) {
    //Api function initialized for google vision
    async function setEndpoint(request) {
        try{
            const result = await client.faceDetection(request);

            return result
        } catch(error) {
            console.log(error);
            return res.status(500).json(`problem with the Google API`);
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

    console.log(filters)

    //To detemine the image size in case we want to show nodes
    let originalImageSize = sizeOf(imageFile);
    //API call being made
    let imageInformation = await setEndpoint(request);
    //Function to calculate unique user information
    let userData = calculateUserData(imageInformation)
    //Unranked glasses for merge (with top n picks, UNORDERED)
    let rawResults = glassesDataReturn(dataBaseProducts,userData, filters.remove, filters.required, filters.minimum, filters.maximum)//No filters right now, add later
    //Mergesort being called (with top n picks, ORDERED)
    let results = mergesort(rawResults)

    //console.log("This is the unordered list: ", rawResults)
    //console.log("This is the ordered list: ",results)
    return results
}

async function facelandmarkURL(url, dataBaseProducts, userFilterData) {
    //Image URL for google - Requires body to have a key value pair URL:<URL>
    let imageURL = url

    //Image original size for google - Checked on front end prior to submit - Requires body to have a key value pair originalImageSize:<originalImageSize> 

    async function setEndpoint(imageURL) {
        try{
            const result = await client.faceDetection(`${imageURL}`);
            
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
    
    //API call being made
    let imageInformation = await setEndpoint(imageURL);

    //Function to calculate unique user information
    let userData = calculateUserData(imageInformation)
    //Unranked glasses for merge (with top n picks, UNORDERED)
    let rawResults = glassesDataReturn(dataBaseProducts,userData)//No filters right now, add later
    //Mergesort being called (with top n picks, ORDERED)
    let results = mergesort(rawResults)

    //console.log("This is the unordered list: ", rawResults)
    //console.log("This is the ordered list: ",results)
    
    return results
}

function facemesh(userFaceData){
    let vortex = [(userFaceData[10].x+userFaceData[152].x)/2,(userFaceData[10].y+userFaceData[152].y)/2,(userFaceData[10].z+userFaceData[152].z)/2]
    let radius_sphere = euclideandistance(userFaceData[10].x,userFaceData[10].y,userFaceData[10].z,vortex[0],vortex[1],vortex[2])
    let radius_circle = euclideandistance(userFaceData[10].x,userFaceData[10].y,0,vortex[0],vortex[1],0)

    let noseTip = userFaceData[4]
    let nose_projection = Math.abs(noseTip.z-vortex[2]) //vert out of the page of nose projection
    
    //console.log("Nose Projection: ", nose_projection)

    let templeUpperR = userFaceData[389]
    let templeLowerR = userFaceData[356]
    let templeUpperL = userFaceData[162]
    let templeLowerL = userFaceData[127]

    let templeUpperR_Radius_3D = euclideandistance(vortex[0],vortex[1],vortex[2],templeUpperR.x,templeUpperR.y,templeUpperR.z) 
    let templeLowerR_Radius_3D  = euclideandistance(vortex[0],vortex[1],vortex[2],templeLowerR.x,templeLowerR.y,templeLowerR.z)
    let templeUpperL_Radius_3D  = euclideandistance(vortex[0],vortex[1],vortex[2],templeUpperL.x,templeUpperL.y,templeUpperL.z)
    let templeLowerL_Radius_3D  = euclideandistance(vortex[0],vortex[1],vortex[2],templeLowerL.x,templeLowerL.y,templeLowerL.z)
    let avgRadTemple_3d = (templeUpperR_Radius_3D+ templeLowerR_Radius_3D + templeUpperL_Radius_3D + templeLowerL_Radius_3D)/4

    let templeUpperR_Radius_2D = euclideandistance(vortex[0],vortex[1],0,templeUpperR.x,templeUpperR.y,0) 
    let templeLowerR_Radius_2D  = euclideandistance(vortex[0],vortex[1],0,templeLowerR.x,templeLowerR.y,0)
    let templeUpperL_Radius_2D  = euclideandistance(vortex[0],vortex[1],0,templeUpperL.x,templeUpperL.y,0)
    let templeLowerL_Radius_2D  = euclideandistance(vortex[0],vortex[1],0,templeLowerL.x,templeLowerL.y,0)

    let avgRadTemple_2d = (templeUpperR_Radius_2D+ templeLowerR_Radius_2D + templeUpperL_Radius_2D + templeLowerL_Radius_2D)/4

    //console.log("The average temple radius 3D is: ", avgRadTemple_3d)
    //console.log("The average temple radius 2D is: ", avgRadTemple_2d)

    let face_sphericality = avgRadTemple_3d/radius_sphere
    let face_circularity = avgRadTemple_2d/radius_circle

    //console.log("The sphericality is: ", face_sphericality)
    //console.log("The circularity is: ", face_circularity)

    let left_eye_left = userFaceData[263]
    let left_eye_right = userFaceData[362]
    let left_eye_top = userFaceData[386]
    let left_eye_bot = userFaceData[374]

    let right_eye_left = userFaceData[33]
    let right_eye_right = userFaceData[133]
    let right_eye_top = userFaceData[159]
    let right_eye_bot = userFaceData[145]

    let left_eye_horizontal_dia = euclideandistance(left_eye_left.x,left_eye_left.y,0,left_eye_right.x,left_eye_right.y,0)
    let left_eye_vertical_dia = euclideandistance(left_eye_top.x,left_eye_top.y,0,left_eye_bot.x,left_eye_bot.y,0)
    
    let right_eye_horizontal_dia = euclideandistance(right_eye_left.x,right_eye_left.y,0,right_eye_right.x,right_eye_right.y,0)
    let right_eye_vertical_dia = euclideandistance(right_eye_top.x,right_eye_top.y,0,right_eye_bot.x,right_eye_bot.y,0)

    let left_eye_circularity = left_eye_vertical_dia/left_eye_horizontal_dia
    let right_eye_circularity = right_eye_vertical_dia/right_eye_horizontal_dia
    let eye_circularity = (left_eye_circularity+right_eye_circularity)/2

    //console.log("The average eye circularity is: ", eye_circularity)

    let userData = {
        nose_projection: nose_projection,
        face_sphericality: face_sphericality,
        face_circularity: face_circularity,
        eye_circularity: eye_circularity
    }

    return userData
}

module.exports = {
    facemesh,
    facelandmark,
    facelandmarkURL,
    filter,
    merge,
    mergesort,
    euclideandistance,
    glassesToUserDataCalc,
    glassesDataReturn,
    uploadImageTest,
    calculateUserData
}