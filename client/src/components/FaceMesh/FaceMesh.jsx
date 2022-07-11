import React, { useEffect, useRef, useState } from "react";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

//Added as per TF api suggestions
import "@mediapipe/face_mesh";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

import axios from "axios";
import Webcam from "react-webcam";
import { drawMesh } from "./FaceMeshUtilities";

function FaceMesh(props) {
  const filters = props.filters;

  const [userFaceData, setUserFaceData] = useState(null);
  const [userResults, setUserResults] = useState(null);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //Load Facemesh
  const runFacemesh = async () => {
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh; //Create model
    const detectorConfig = {
      //Config
      runtime: "tfjs",
    };
    const nodes = await faceLandmarksDetection.createDetector(
      model,
      detectorConfig
    );
    setInterval(() => {
      detect(nodes);
    }, 10);
  };

  //Detech function
  const detect = async (nodes) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Checking cam is not unfefined or null and it is recieving data (readState === 4)
      //Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set video widths
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //Set canvas witdh
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //Make detections
      const estimationConfig = { flipHorizontal: false };
      const face = await nodes.estimateFaces(video, estimationConfig);
      setUserFaceData(face[0].keypoints);

      //Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face[0], ctx);
      });
    }
  };

  useEffect(() => {
    runFacemesh();
  }, []);

  const uploadNodes = async (userFaceData) => {
    if(userFaceData){
      console.log("This is the submission: ",userFaceData)
      try{
        let result = await axios.post("/facemesh", { userFaceData, filters })
        //console.log("This is the result: ",result)
        return result
      }catch(error){
        console.log("Error with submission: ",error)
      }
    }
  };

  return (
    <div>
      <div className="Facemesh"
      style={{
        width: 640,
        height: 480,
      }}>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
    </div>
    <br/>
    <button className="btn btn-primary" 
    style={{
      position: "absolute",
      marginTop: 10 
    }}
    onClick={async (event) => {
      event.preventDefault();
      let result = await uploadNodes(userFaceData);
      setUserResults(result.data)
      }}>
       Facial Node Detection
     </button>
     {(userResults)
     ?(<div style={{
      position: "absolute",
      marginTop: 30 
      }}>
        <br/>
        <b>Nose Projection (Z-Direction): {userResults.nose_projection}</b>
        <br/>
        <b>Face Sphericality: {userResults.face_sphericality}</b>
        <br/>
        <b>Face Circularity: {userResults.face_circularity}</b>
        <br/>
        <b>Eye Circularity: {userResults.eye_circularity}</b>
     </div>)
     :<></>
     }
     </div>
  );
}

export default FaceMesh;
