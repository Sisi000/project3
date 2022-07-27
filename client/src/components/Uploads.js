import React from "react";
// import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import UploadS3 from "./uploadS3/UploadS3";
import Webcam from "./Webcam/Webcam";
import UploadUrl from "./uploadUrl/UploadUrl";
import UploadFilters from "./UploadFilters/UploadFilters";
import FaceMesh from "./FaceMesh/FaceMesh"
import "./Uploads.css";
import imgaiml from "../assets/aiml.png";

export default function Uploads() {
  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);
  const [isShown4, setIsShown4] = useState(false);

  /*
  For filters
  */

  let priceCap = 500

  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(priceCap)

  const [colorBlack, setColorBlack] = useState(false)
  const [colorWhite, setColorWhite] = useState(false)
  const [colorBlue, setColorBlue] = useState(false)
  const [colorRed, setColorRed] = useState(false)
  const [colorBrown, setColorBrown] = useState(false)
  const [colorGreen, setColorGreen] = useState(false)
  const [colorGold, setColorGold] = useState(false)
  const [colorGrey, setColorGrey] = useState(false)

  const [prescription, setPrescription] = useState(0)

  const [shapeAvaitor, setShapeAvaitor] = useState(false)
  const [shapeSquare, setShapeSquare] = useState(false)
  const [shapeRectangle, setShapeRectangle] = useState(false)
  const [shapeOval, setShapeOval] = useState(false)
  const [shapeRound, setShapeRound] = useState(false)

  /*
  For exclude filters
  */
  let colorFilter = 
  [[colorBlack,"Black"], 
  [colorWhite,"White"], 
  [colorBlue,"Blue"], 
  [colorRed,"Red"], 
  [colorBrown,"Brown"], 
  [colorGreen,"Green"],
  [colorGold,"Gold"],
  [colorGrey,"Grey"]]

  let frameFilter = 
  [[shapeAvaitor,"Avaitor"], 
  [shapeSquare,"Square"], 
  [shapeRectangle,"Rectangle"], 
  [shapeOval,"Oval"], 
  [shapeRound,"Round"]]

  function ifExclude(filterList){
    let counter = 0
    for(let filter of filterList){
      if(filter[0]) counter++
    }
    if(counter) return true
    else return false
  }

  let excludeList={
    frameColor:null,
    category:null
  }

  function buildExcludeList(filterList){
    let excludedItem=null
    if(ifExclude(filterList)){
      for(let filter of filterList){
        if(filter[0]){
          if(excludedItem){
            excludedItem.push(filter[1])
          }else excludedItem = [filter[1]]
        }
      }
    }
    return excludedItem
  }

  excludeList.frameColor = buildExcludeList(colorFilter)
  excludeList.category = buildExcludeList(frameFilter)

  /*
  For Minimum filter
  */
  let minPriceFilter = 
  [
    priceMin,
  ]
  let PerscriptionFilter =
  [ 
    prescription,
  ]

  function ifMinimum(filterList){
    let counter = 0
    for(let filter of filterList){
      if(filter) counter++
    }
    if(counter) return true
    else return false
  }

  let minimumList={
    price:null,
    prescription:null,
  }

  function buildMinimumList(filterList){
    let minimum=null
    if(ifMinimum(filterList)){
      for(let filter of filterList){
        if(filter){
          if(minimum){
            minimum.push(filter)
          }else minimum = [filter]
        }
      }
    }
    return minimum
  }

  minimumList.price = buildMinimumList(minPriceFilter)
  minimumList.prescription = buildMinimumList(PerscriptionFilter)

  /*
  For Maximum filter
  */

  let maxPriceFilter = 
  [
    priceMax,
  ]

  function ifMaximum(filterList){
    let counter = 0
    for(let filter of filterList){
      if(filter < priceCap) counter++
    }
    if(counter) return true
    else return false
  }

  let maximumList={
    price:null,
  }

  function buildMaximumList(filterList){
    let maximum=null
    if(ifMaximum(filterList)){
      for(let filter of filterList){
        if(filter){
          if(maximum){
            maximum.push(filter)
          }else maximum = [filter]
        }
      }
    }
    return maximum
  }

  maximumList.price = buildMaximumList(maxPriceFilter)

  /*
  Create filter variable 
  */
  const filters = {
    remove: (excludeList.frameColor || excludeList.category) ? excludeList : null,
    required: null,
    minimum: (minimumList.price || minimumList.prescription) ? minimumList : null,
    maximum: (maximumList.price) ? maximumList : null,
  }

  //console.log("filters are : ",filters)

  /*
  Filters done
  */

  const handleClick1 = () => {
    setIsShown1((current) => !current);
    setIsShown2(false);
    setIsShown3(false);
    setIsShown4(false);
  };
  const handleClick2 = () => {
    setIsShown2((current) => !current);
    setIsShown1(false);
    setIsShown3(false);
    setIsShown4(false);
  };

  const handleClick3 = () => {
    setIsShown3((current) => !current);
    setIsShown1(false);
    setIsShown2(false);
    setIsShown4(false);
  };

  const handleClick4 = () => {
    setIsShown4((current) => !current);
    setIsShown1(false);
    setIsShown2(false);
    setIsShown3(false);
  };

  return (
    <>
    <div className="uploads-text">Find frames that fit your face with our Virtual Optician!</div>
    <div>
      <UploadFilters
      prescription={prescription}
      setPrescription={setPrescription}
      priceMin={priceMin}
      setPriceMin={setPriceMin}
      priceMax={priceMax}
      setPriceMax={setPriceMax}
      colorBlack={colorBlack} 
      setColorBlack={setColorBlack}
      colorWhite= {colorWhite}
      setColorWhite={setColorWhite}
      colorBlue={colorBlue}
      setColorBlue={setColorBlue}
      colorRed={colorRed}
      setColorRed={setColorRed}
      colorBrown={colorBrown}
      setColorBrown={setColorBrown}
      colorGreen={colorGreen}
      setColorGreen={setColorGreen}
      shapeAvaitor = {shapeAvaitor}
      setShapeAvaitor = {setShapeAvaitor}
      shapeSquare = {shapeSquare}
      setShapeSquare = {setShapeSquare}
      shapeRectangle = {shapeRectangle}
      setShapeRectangle = {setShapeRectangle}
      shapeOval = {shapeOval} 
      setShapeOval = {setShapeOval}
      shapeRound = {shapeRound}
      setShapeRound = {setShapeRound}
      colorGold={colorGold}
      setColorGold={setColorGold}
      colorGrey={colorGrey}
      setColorGrey={setColorGrey}
      />
    <div className="uploads-container">
      <div className="uploads-btns-container">
        <button className="btn btn-primary" onClick={handleClick1}>
          Upload Photo
        </button>
        <button className="btn btn-primary" onClick={handleClick2}>
          Web Cam
        </button>
        <button className="btn btn-primary" onClick={handleClick3}>
          Upload Url
        </button>
        <button className="btn btn-primary" onClick={handleClick4}>
          Facial Node Detection
        </button>
        </div>
        <div className="upload-content">
        {isShown1 && <UploadS3 filters = {filters}/>}
        {isShown2 && <Webcam filters = {filters}/>}
        {isShown3 && <UploadUrl filters = {filters}/>}
        {isShown4 && <FaceMesh filters = {filters}/>}
      </div>
      <img className="imgaiml" src={imgaiml} alt="uploads"/>
    </div>
    </div>
    </>
  );
}
