import React from "react";
// import Nav from "react-bootstrap/Nav";
import {useState} from 'react';
import UploadS3 from './uploadS3/UploadS3';
import Webcam from "./Webcam/Webcam";
import UploadUrl from './uploadUrl/UploadUrl';
import "./Uploads.css"


export default function Uploads() {
  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);

  const handleClick1 = (event) => {
    // 👇️ toggle shown state
    setIsShown1(current => !current);
    setIsShown2(false);
    setIsShown3(false);
  }
    const handleClick2 = (event) => {
      // 👇️ toggle shown state
      setIsShown2(current => !current);
      setIsShown1(false);
      setIsShown3(false);
    }

      const handleClick3 = (event) => {
        // 👇️ toggle shown state
        setIsShown3(current => !current);
        setIsShown1(false);
        setIsShown2(false);
    

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div className="uploads-container">
    <div>
      <button className="btn-uploads1" onClick={handleClick1}>Upload Photo</button>
        {isShown1 && <UploadS3 />}
    </div>
      <div>
      <button className="btn-uploads2" onClick={handleClick2}>Web Cam</button>
         {isShown2 && <Webcam />}
    </div>
    <div>
      <button className="btn-uploads3" onClick={handleClick3}>Upload Url</button>
         {isShown3 && <UploadUrl/>}
    </div>
    </div>
  );
}




