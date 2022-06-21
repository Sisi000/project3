const {facelandmark, facelandmarkURL, filter, merge, mergesort, euclideandistance, glassesToUserDataCalc, glassesDataReturn } = require("./faceDetectionCalc");
const fs = require ('fs');
const dataBaseProducts = require("./testData/dataBaseProducts.json")

test("Tests for image submit to Google API", async () => {

    let returnImageSize = { height: 849, width: 849, type: 'jpg' }

    let imageFileUpload = fs.readFileSync("./testimages/testimage.jpg"); 
    let facelandmarkResult = await facelandmark(imageFileUpload, dataBaseProducts);
    //console.log(facelandmarkResult)
    
    expect(facelandmarkResult).toBeDefined()
    expect(facelandmarkResult[1].height).toEqual(returnImageSize.height)
    expect(facelandmarkResult[1].width).toEqual(returnImageSize.width)
    expect(facelandmarkResult[1].name).toEqual(returnImageSize.name)
    expect(facelandmarkResult[0][0][1]).toEqual(dataBaseProducts[3]._id)
    expect(facelandmarkResult[0][1][1]).toEqual(dataBaseProducts[5]._id)
})

test("Tests for URL submit to Google API", async () => {
    //console.log("api keys: ", process.env.GOOGLE_API_EMAIL)
    //console.log("api keys: ", process.env.GOOGLE_API_KEY)

    let URL = "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1575"; 
    let facelandmarkResultURL = await facelandmarkURL(URL,dataBaseProducts);
    //console.log(facelandmarkResultURL)
    expect(facelandmarkResultURL).toBeDefined()
})

test("Used for testing merging of glasses data using mergesort", () => {
    let testData = [9,8,7,6,5,4,3,2,1]
    let testData2 = [[9,"test9"],[4,"test4"],[2,"test2"],[6,"test6"],[1,"test1"]]

    let testResult = mergesort(testData)
    let testResult2 = mergesort(testData2)

    expect(testResult).toEqual([1,2,3,4,5,6,7,8,9])
    expect(testResult2).toEqual([                                                                                                                                                                                                                                                                                                                         
        [ 1, 'test1' ],
        [ 2, 'test2' ],
        [ 4, 'test4' ],
        [ 6, 'test6' ],
        [ 9, 'test9' ]
      ])
})

test("Used for testing merg of glasses data used in mergesort", () => {
    let testData1 = [[9]]
    let testData2 = [[2]]

    let testData3 = [[12]]
    let testData4 = [[24]]

    let testResult = merge(testData1,testData2)
    let testResult2 = merge(testData3,testData4)

    expect(testResult).toEqual([[2],[9]])
    expect(testResult2).toEqual([[12],[24]])
})

test("Used for testing euclidean distance calculation", () => {
    let coord1 = [1,2,3]
    let coord2 = [0,0,0]

    let coord3 = [1,1,1]
    let coord4 = [12,8,10]

    let coord5 = [-10,1,-10]
    let coord6 = [-12,8,-20]

    let testResult1 = euclideandistance(coord1[0],coord1[1],coord1[2],coord2[0],coord2[1],coord2[2])
    let testResult2 = euclideandistance(coord3[0],coord3[1],coord3[2],coord4[0],coord4[1],coord4[2])
    let testResult3 = euclideandistance(coord5[0],coord5[1],coord5[2],coord6[0],coord6[1],coord6[2])

    expect(testResult1).toBeCloseTo(3.741657)
    expect(testResult2).toBeCloseTo(15.84298)
    expect(testResult3).toBeCloseTo(12.369317)
})

test("Used for testing glassesToUserDataCalc for user to database Euclid Distance", () => {
    let userData1 = [2,1,1,5]
    let userData2 = [0,0,0,0]

    let testData1 = [0,0,0,0]
    let testData2 = [1,2,4,3]

    let testResult1 = glassesToUserDataCalc(userData1, testData1)
    let testResult2 = glassesToUserDataCalc(userData2, testData2)
    let testResult3 = glassesToUserDataCalc(userData1, testData2)

    expect(testResult1).toBeCloseTo(5.568)
    expect(testResult2).toBeCloseTo(5.477)
    expect(testResult3).toBeCloseTo(3.873)
})

test("Used for testing glassesDataReturn for unranked list return", () => {
    let userData1 = [2,1,1,2];

    let testData1 = [
        {"_id":"Glasses 8",
        //"data":[2,1,1,2],
        "eyeRatio":2,
        "earFaceRatio":1,
        "cheekChinRatio":1,
        "noseRatio":2,
        "frameColor":"black",
        "prescriptionMin":0,
        "prescriptionMax":9,
        "weight":55,//grams
        "frame":"oval",
        "price":400, //$
        },//Christian Ronaldo
        {"_id":"Glasses 9",
        //"data":[4,2,2,4],
        "eyeRatio":4,
        "earFaceRatio":2,
        "cheekChinRatio":2,
        "noseRatio":4,
        "frameColor":"grey",
        "prescriptionMin":1,
        "prescriptionMax":7,
        "weight":45,//grams
        "frame":"triangle",
        "price":250, //$
        },//Serena Williams
        {"_id":"Glasses 10",
        //"data":[3,1,1,2],
        "eyeRatio":3,
        "earFaceRatio":1,
        "cheekChinRatio":1,
        "noseRatio":2,
        "frameColor":"red",
        "prescriptionMin":2,
        "prescriptionMax":10,
        "weight":45,//grams
        "frame":"oval",
        "price":450, //$
        },//Shakira
    ];

    let testResult1 = glassesDataReturn(testData1,userData1)
    //console.log(testResult1)
    expect(testResult1).toBeDefined()
    expect(testResult1[0][1]).toEqual(testData1[0]._id)
    expect(testResult1[1][1]).toEqual(testData1[1]._id)
    expect(testResult1[2][1]).toEqual(testData1[2]._id)
    expect(testResult1[0][0]).toEqual(0)
    expect(testResult1[2][0]).toEqual(1)
})

test("Used for testing filter", () => {
    let glassesTestData1=[
        {"_id":"Glasses 1",
        //"data":[2.4836,1.1581,0.7601,1.9322],
        "eyeRatio":2.4836,
        "earFaceRatio":1.1581,
        "cheekChinRatio":0.7601,
        "noseRatio":1.9322,
        "frameColor":"blue",
        "prescriptionMin":1,//min size = 0, max size 10
        "prescriptionMax":8,
        "weight":40,//grams
        "frame":"square",
        "price":450, //$
        },//Brad Pitt
        {"_id":"Glasses 2",
        //"data":[2.2740,1.2698,0.8955,2.2307],
        "eyeRatio":2.2740,
        "earFaceRatio":1.2698,
        "cheekChinRatio":0.8955,
        "noseRatio":2.2307,
        "frameColor":"red",
        "prescriptionMin":0,
        "prescriptionMax":9,
        "weight":35,//grams
        "frame":"circle",
        "price":300, //$
        },//BTS
        {"_id":"Glasses 3",
        //"data":[2.4132,1.0822,0.8577,1.9868],
        "eyeRatio":2.4132,
        "earFaceRatio":1.0822,
        "cheekChinRatio":0.8577,
        "noseRatio":1.9868,
        "frameColor":"brown",
        "prescriptionMin":2,
        "prescriptionMax":7,
        "weight":50,//grams
        "frame":"square",
        "price":250, //$
        },//Denzel Washington
        {"_id":"Glasses 4",
        //"data":[2.3881,1.1532,0.7524,2.0369],
        "eyeRatio":2.3881,
        "earFaceRatio":1.1532,
        "cheekChinRatio":0.7524,
        "noseRatio":2.0369,
        "frameColor":"black",
        "prescriptionMin":0,
        "prescriptionMax":10,
        "weight":30,//grams
        "frame":"oval",
        "price":200, //$
        },//Dwayne Johnson
        {"_id":"Glasses 5",
        //"data":[2.4372,1.2571,0.7567,1.8846],
        "eyeRatio":2.4372,
        "earFaceRatio":1.2571,
        "cheekChinRatio":0.7567,
        "noseRatio":1.8846,
        "frameColor":"black",
        "prescriptionMin":0,
        "prescriptionMax":10,
        "weight":35,//grams
        "frame":"square",
        "price":300, //$
        },//Eminem
        {"_id":"Glasses 6",
        //"data":[2.3847,1.2567,0.7788,2.1247],
        "eyeRatio":2.3847,
        "earFaceRatio":1.2567,
        "cheekChinRatio":0.7788,
        "noseRatio":2.1247,
        "frameColor":"blue",
        "prescriptionMin":2,
        "prescriptionMax":7,
        "weight":25,//grams
        "frame":"square",
        "price":350, //$
        },//Gordon Ramsey
        {"_id":"Glasses 7",
        //"data":[2.3088,1.2542,0.7389,2.0332],
        "eyeRatio":2.3088,
        "earFaceRatio":1.2542,
        "cheekChinRatio":0.7389,
        "noseRatio":2.0332,
        "frameColor":"brown",
        "prescriptionMin":1,
        "prescriptionMax":10,
        "weight":30,//grams
        "frame":"square",
        "price":300, //$
        },//Justin Trudeau
        {"_id":"Glasses 8",
        //"data":[2.0897,1.2618,0.7698,1.9015],
        "eyeRatio":2.0897,
        "earFaceRatio":1.2618,
        "cheekChinRatio":0.7698,
        "noseRatio":1.9015,
        "frameColor":"black",
        "prescriptionMin":0,
        "prescriptionMax":9,
        "weight":55,//grams
        "frame":"oval",
        "price":400, //$
        },//Christian Ronaldo
        {"_id":"Glasses 9",
        //"data":[2.3786,1.1987,0.7553,2.1600],
        "eyeRatio":2.3786,
        "earFaceRatio":1.1987,
        "cheekChinRatio":0.7553,
        "noseRatio":2.1600,
        "frameColor":"grey",
        "prescriptionMin":1,
        "prescriptionMax":7,
        "weight":45,//grams
        "frame":"triangle",
        "price":250, //$
        },//Serena Williams
        {"_id":"Glasses 10",
        //"data":[2.1103,1.2603,0.7584,2.1184],
        "eyeRatio":2.1103,
        "earFaceRatio":1.2603,
        "cheekChinRatio":0.7584,
        "noseRatio":2.1184,
        "frameColor":"red",
        "prescriptionMin":2,
        "prescriptionMax":10,
        "weight":45,//grams
        "frame":"oval",
        "price":450, //$
        },//Shakira
    ]

    let testRemove ={
        "frameColor":["red","brown"]
    }
    let testRequired = {
        "frame":["oval","square"]
    }
    let testMinimum = {
        "prescriptionMax":[8]
    }
    let testMaximum = {
        "weight":[50],
        "price":[400]
    }
    //Remove filters
    let testResult1True = filter(glassesTestData1[0], testRemove, null, null, null)
    expect(testResult1True).toBeTruthy()
    let testResult1False1 = filter(glassesTestData1[9], testRemove, null, null, null)
    expect(testResult1False1).toBeFalsy()
    let testResult1False2 = filter(glassesTestData1[6], testRemove, null, null, null)
    expect(testResult1False2).toBeFalsy()

    //Required filters
    let testResult2False1 = filter(glassesTestData1[1], null, testRequired, null, null)
    expect(testResult2False1).toBeFalsy()
    let testResult2False2 = filter(glassesTestData1[8], null, testRequired, null, null)
    expect(testResult2False2).toBeFalsy()
    let testResult2True1 = filter(glassesTestData1[9], null, testRequired, null, null)
    expect(testResult2True1).toBeTruthy()
    let testResult2True2 = filter(glassesTestData1[6], null, testRequired, null, null)
    expect(testResult2True2).toBeTruthy()
    
    //Min filters
    let testResult3True1 = filter(glassesTestData1[9], null, null, testMinimum, null)
    expect(testResult3True1).toBeTruthy()
    let testResult3True2 = filter(glassesTestData1[0], null, null, testMinimum, null)
    expect(testResult3True2).toBeTruthy()
    let testResult3False1 = filter(glassesTestData1[8], null, null, testMinimum, null)
    expect(testResult3False1).toBeFalsy()

    //Max filters
    let testResult4False1 = filter(glassesTestData1[7], null, null, null, testMaximum)
    expect(testResult4False1).toBeFalsy()
    let testResult4False2 = filter(glassesTestData1[9], null, null, null, testMaximum)
    expect(testResult4False2).toBeFalsy()
    let testResult4True1 = filter(glassesTestData1[6], null, null, null, testMaximum)
    expect(testResult4True1).toBeTruthy()
    let testResult4True2 = filter(glassesTestData1[5], null, null, null, testMaximum)
    expect(testResult4True2).toBeTruthy()

    //All filters
    let testResult5True1 = filter(glassesTestData1[4], testRemove, testRequired, testMinimum, testMaximum)
    expect(testResult5True1).toBeTruthy()
    let testResult5True2 = filter(glassesTestData1[4], testRemove, testRequired, testMinimum, testMaximum)
    expect(testResult5True2).toBeTruthy()
    let testResult5False1 = filter(glassesTestData1[1], testRemove, testRequired, testMinimum, testMaximum)
    expect(testResult5False1).toBeFalsy()
    let testResult5False2 = filter(glassesTestData1[9], testRemove, testRequired, testMinimum, testMaximum)
    expect(testResult5False2).toBeFalsy()
    
    for(let data of glassesTestData1){//No filters
        let testResult6 = filter(data)
        expect(testResult6).toBeTruthy()
    }
})


/* Old test data
let glassesTestData=[
    {"type":"Glasses 1",
    "data":[2.4836,1.1581,0.7601,1.9322],
    "color":"blue",
    "prescriptionMin":1,//min size = 0, max size 10
    "prescriptionMax":8,
    "weight":40,//grams
    "frame":"square",
    "price":450, //$
    },//Brad Pitt
    {"type":"Glasses 2",
    "data":[2.2740,1.2698,0.8955,2.2307],
    "color":"red",
    "prescriptionMin":0,
    "prescriptionMax":9,
    "weight":35,//grams
    "frame":"circle",
    "price":300, //$
    },//BTS
    {"type":"Glasses 3",
    "data":[2.4132,1.0822,0.8577,1.9868],
    "color":"brown",
    "prescriptionMin":2,
    "prescriptionMax":7,
    "weight":50,//grams
    "frame":"square",
    "price":250, //$
    },//Denzel Washington
    {"type":"Glasses 4",
    "data":[2.3881,1.1532,0.7524,2.0369],
    "color":"black",
    "prescriptionMin":0,
    "prescriptionMax":10,
    "weight":30,//grams
    "frame":"oval",
    "price":200, //$
    },//Dwayne Johnson
    {"type":"Glasses 5",
    "data":[2.4372,1.2571,0.7567,1.8846],
    "color":"black",
    "prescriptionMin":0,
    "prescriptionMax":10,
    "weight":35,//grams
    "frame":"square",
    "price":300, //$
    },//Eminem
    {"type":"Glasses 6",
    "data":[2.3847,1.2567,0.7788,2.1247],
    "color":"blue",
    "prescriptionMin":2,
    "prescriptionMax":7,
    "weight":25,//grams
    "frame":"square",
    "price":350, //$
    },//Gordon Ramsey
    {"type":"Glasses 7",
    "data":[2.3088,1.2542,0.7389,2.0332],
    "color":"brown",
    "prescriptionMin":1,
    "prescriptionMax":10,
    "weight":30,//grams
    "frame":"square",
    "price":300, //$
    },//Justin Trudeau
    {"type":"Glasses 8",
    "data":[2.0897,1.2618,0.7698,1.9015],
    "color":"black",
    "prescriptionMin":0,
    "prescriptionMax":9,
    "weight":55,//grams
    "frame":"oval",
    "price":400, //$
    },//Christian Ronaldo
    {"type":"Glasses 9",
    "data":[2.3786,1.1987,0.7553,2.1600],
    "color":"grey",
    "prescriptionMin":1,
    "prescriptionMax":7,
    "weight":45,//grams
    "frame":"triangle",
    "price":250, //$
    },//Serena Williams
    {"type":"Glasses 10",
    "data":[2.1103,1.2603,0.7584,2.1184],
    "color":"red",
    "prescriptionMin":2,
    "prescriptionMax":10,
    "weight":45,//grams
    "frame":"oval",
    "price":450, //$
    },//Shakira
]
//Test filters, currrently not used. These work
let testRemove ={
    "frameColor":["red","brown"]
}
let testRequired = {
    "frame":["oval","square"]
}
let testMinimum = {
    "prescriptionMax":[8]
}
let testMaximum = {
    "weight":[50],
    "price":[400]
}
*/