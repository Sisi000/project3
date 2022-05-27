const {facelandmark} = require("./faceDetectionCalc");
const fs = require ('fs');

test("Tests for image submit to Google API", async () => {
    let imageFileUpload = fs.readFileSync("./testimages/testimage.jpg"); 
    let facelandmarkResult = await facelandmark(imageFileUpload);
    expect(facelandmarkResult).toBeDefined()
})