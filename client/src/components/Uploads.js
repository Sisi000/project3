import React from "react";
// import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import UploadS3 from "./uploadS3/UploadS3";
import Webcam from "./Webcam/Webcam";
import UploadUrl from "./uploadUrl/UploadUrl";
import UploadFilters from "./UploadFilters/UploadFilters";
import "./Uploads.css";

export default function Uploads() {
  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);


  const handleClick1 = () => {
    setIsShown1((current) => !current);
    setIsShown2(false);
    setIsShown3(false);
  };
  const handleClick2 = () => {
    setIsShown2((current) => !current);
    setIsShown1(false);
    setIsShown3(false);
  };

  const handleClick3 = () => {
    setIsShown3((current) => !current);
    setIsShown1(false);
    setIsShown2(false);
  };

  return (
    <div>
      <UploadFilters/>
    <div className="uploads-container">
      <div className="uploads-btns-container">
        <button className="btn-uploads1" onClick={handleClick1}>
          Upload Photo
        </button>
        <button className="btn-uploads2" onClick={handleClick2}>
          Web Cam
        </button>
        <button className="btn-uploads3" onClick={handleClick3}>
          Upload Url
        </button>
        </div>
        <div className="upload-content">
        {isShown1 && <UploadS3 />}
        {isShown2 && <Webcam />}
        {isShown3 && <UploadUrl />}
      </div>
    </div>
    </div>
  );
}
