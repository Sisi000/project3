import React, { useEffect, useRef, useState } from "react";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import Product from "../Product";
import { axiosPost } from "../AxiosHelper";
import Button from "react-bootstrap/Button";


//Added as per TF api suggestions
import "@mediapipe/face_mesh";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

import Webcam from "react-webcam";
import { drawMesh } from "./FaceMeshUtilities";
import { Col, Container, Row } from "react-bootstrap";
import "../Webcam/Webcam.css";

function FaceMesh(props) {
  const filters = props.filters;

  const [userFaceData, setUserFaceData] = useState(null);
  const [products, setProducts] = useState([]);

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

  const showSuggestedMesh = async (result) => {
    const params = result;
    try {
      const endpoint = `/api/products/id`;
      const payload = { params };
      const products = await axiosPost(endpoint, payload);
      setProducts(products.data);
    } catch (error) {
      console.log("Error with the database API: ", error);
    }
  };

  const uploadNodes = async (userFaceData, filters) => {
    if (userFaceData) {
      try {
        const endpoint = "/facemesh";
        const payload = { userFaceData, filters };
        const result = await axiosPost(endpoint, payload);
        await showSuggestedMesh(result.data);
      } catch (error) {
        console.log("Error with submission: ", error);
      }
    }
  };

  // const [show, setShow] = useState(false);

  // const handleShow = () => {
  //   setShow(true);
  //   setTimeout(() => setShow(false), 3800);
  // };

  // const [isHide, setIsHide] = useState(true);
  // if (products.length > 0) {
  //   setTimeout(() => setIsHide(false), 3800);
  //   clearTimeout(setIsHide);
  // }

  return (
    <div>
      <div className="container-uploads">
        <form className="forms3">
          <b>Instructions:</b>
          <p>
            Optional: Tell the virtual optician a few preferences with the
            filters
          </p>
          <p>
            1) Ensure the subject is facing the camera with their face fully
            visible.
          </p>
          <p>2) Wait for mesh to appear on the subject's face</p>
          <p>3) Submit Facial Node Detection to the virtual optician.</p>
          <p>4) See what products fit the face!</p>
          <br />
          <div
            className="Facemesh"
            style={{
              width: 640,
              height: 480,
            }}
          >
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
            {/* <Modal
              style={{ visibility: "hidden", marginTop: "500px", position: "absolute" }}
              show={show}
            >
              <Modal.Body
                style={{ visibility: "visible" }}
              >
                <img src={scan} style={{ width: "120%", marginLeft: "-50px", position: "absolute" }} alt=""></img>
              </Modal.Body>
            </Modal> */}
          </div>
          <br />
          <Button
            className="btn btn-primary"
            style={{
              marginTop: 10,
            }}
            onClick={async (event) => {
              // setProducts([]);
              event.preventDefault();
              await uploadNodes(userFaceData, filters);
              // handleShow();
            }}
          >
            Submit
          </Button>
        </form>
      </div>
      <Container fluid style={{ padding: "0" }}>
        <Container className="mt-3">
          <div>
            <div className="products my-5 py-2">
              <Row>
              {products.length > 0 && <h1>Suggested Glasses</h1>}
                {products.map((product) => (
                  <Col key={product._id} sm={6} md={4} lg={4} className="mb-3">
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default FaceMesh;
