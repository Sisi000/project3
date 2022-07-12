const vision = require('@google-cloud/vision');
const sizeOf = require("image-size");

var config = {credentials:
    {
        client_email:process.env.GOOGLE_API_EMAIL,
        private_key:process.env.GOOGLE_API_KEY,
    }
};

/* Used for building test
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
*/

/*
function facemeshTest(userFaceData){
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
*/

module.exports = {
    facemeshTest,
    uploadImageTest
}