const {facelandmark, facelandmarkURL} = require("./faceDetectionCalc");
const fs = require ('fs');


test("Tests for image submit to Google API", async () => {

    //console.log("api keys: ", process.env.GOOGLE_API_EMAIL)
    //console.log("api keys: ", process.env.GOOGLE_API_KEY)

    let imageFileUpload = fs.readFileSync("./testimages/testimage.jpg"); 
    let facelandmarkResult = await facelandmark(imageFileUpload);
    expect(facelandmarkResult).toBeDefined()
})

test("Tests for URL submit to Google API", async () => {

    //console.log("api keys: ", process.env.GOOGLE_API_EMAIL)
    //console.log("api keys: ", process.env.GOOGLE_API_KEY)

    let URL = "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1575"; 
    let facelandmarkResultURL = await facelandmarkURL(URL);
    expect(facelandmarkResultURL).toBeDefined()
})
/*
test("Used for getting glasses data", async () => {

    //console.log("api keys: ", process.env.GOOGLE_API_EMAIL)
    //console.log("api keys: ", process.env.GOOGLE_API_KEY)

    let imageFileUpload = fs.readFileSync("./testimages/data-2022-06-09/Shakira.jpg"); 
    let facelandmarkResult = await facelandmark(imageFileUpload);
    expect(facelandmarkResult).toBeDefined()
})
*/