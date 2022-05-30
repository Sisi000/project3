const {facelandmark} = require("./faceDetectionCalc");
const fs = require ('fs');


test("Tests for image submit to Google API", async () => {

    //console.log("api keys: ", process.env.GOOGLE_API_EMAIL)
    //console.log("api keys: ", process.env.GOOGLE_API_KEY)

    let imageFileUpload = fs.readFileSync("./testimages/testimage.jpg"); 
    let facelandmarkResult = await facelandmark(imageFileUpload);
    expect(facelandmarkResult).toBeDefined()
})