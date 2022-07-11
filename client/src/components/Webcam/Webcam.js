import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "./Webcam.css";
import Product from "../Product";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

function WebcamCapture(props) {
  const filters = props.filters;

  const [file, setFile] = useState("");
  const [products, setProducts] = useState([]);
  const webcamRef = React.useRef(null);

  const filterJSON = JSON.stringify(filters);

  async function postImage(filesForUpload) {
    const formData = new FormData();
    formData.append("image", filesForUpload); //image
    formData.append("filters", filterJSON); //image
    const result = await axios({
      method: "POST",
      url: "/uploadwebcam",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Suggested glasses are", result.data);
 
    return result.data;
  }

  /* Remove - see above
  async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("/uploadwebcam", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setResultData(result.data);
    return result.data;
  }
*/

  const capture = React.useCallback(() => {
    const file = webcamRef.current.getScreenshot();
    setFile(file);
  }, [webcamRef]);

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage(file)
      .then((result) => {
        showSuggestedCam(result);
      })
      .catch((err) => {
        console.log(err);
      });
    setFile(result.image);
  };

  const showSuggestedCam = async (result) => {
    const params = result;
    const result2 = await axios.post(`/api/products/id`, { params });
    setProducts(result2.data);
  };

  return (
    <div className="webcam-container">
      <div className="container-uploads">
        <form className="forms3" onSubmit={submit}>
          <div className="webcam-img">
            {file === "" ? (
              <Webcam
                audio={false}
                height={400}
                ref={webcamRef}
                screenshotFormat="image/*"
                width={400}
                videoConstraints={videoConstraints}
              />
            ) : (
              <img src={file} alt="" />
            )}
          </div>
          <div>
            {file !== "" ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFile("");
                  setProducts([]);
                }}
                className="btn btn-primary"
              >
                Retake Image
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  capture();
                }}
                className="btn btn-primary"
              >
                Capture
              </button>
            )}
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
      <Container fluid style={{ padding: "0" }}>
        <Container className="mt-3">
          <div>
            <div className="products my-5 py-2">
              <Row>
              {products.length > 0 && <h1>Suggested Glasses</h1>}
                {products.map((product) => (
                  <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
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

export default WebcamCapture;
