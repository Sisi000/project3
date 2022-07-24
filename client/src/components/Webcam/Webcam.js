import React, { useState } from "react";
import Webcam from "react-webcam";
import { axiosPostMPFD, axiosPost } from "../AxiosHelper";
import { Container, Row, Col } from "react-bootstrap";
import "./Webcam.css";
import Product from "../Product";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import scan from "../../assets/scan.gif";

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
    formData.append("image", filesForUpload);
    formData.append("filters", filterJSON);
    const endpoint = "/uploadwebcam";
    const result = await axiosPostMPFD(endpoint, formData);
    return result;
  }

  const capture = React.useCallback(() => {
    const file = webcamRef.current.getScreenshot();
    setFile(file);
  }, [webcamRef]);

  const showSuggestedCam = async (result) => {
    const params = result;
    const endpoint = `/api/products/id`;
    const result2 = await axiosPost(endpoint, { params });
    setProducts(result2.data);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (file) {
      const result = await postImage(file)
        .then(async (result) => {
          await showSuggestedCam(result);
        })
        .catch((err) => {
          console.log(err);
        });
      setFile(result.image);
    } else {
      console.log("No file taken, please take picture");
    }
  };

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3800);
  };

  const [isHide, setIsHide] = useState(true);
  if (products.length > 0) {
    setTimeout(() => setIsHide(false), 2800);
    clearTimeout(setIsHide);
  }

  return (
    <div>
      <div className="container-uploads">
        <form className="forms3" onSubmit={submit}>
          <b>Instructions:</b>
          <p>
            Optional: Tell the virtual optician a few preferences with the
            filters
          </p>
          <p>
            1) Ensure the subject is facing the camera with their face fully
            visible.
          </p>
          <p>
            2) Capture the picture on the webcam. Retake the picture if needed
          </p>
          <p>3) Upload the picture to the virtual optician.</p>
          <p>4) See what products fit the face!</p>
          <br />

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

          <Button
            className="btn btn-primary"
            onClick={handleShow}
            type="submit"
          >
            Submit
          </Button>
          <Modal
            style={{
              visibility: "hidden",
              marginTop: "380px",
              position: "absolute",
            }}
            show={show}
          >
            <Modal.Body style={{ visibility: "visible", marginTop: "130px" }}>
              <img
                src={scan}
                style={{ width: "100%", marginLeft: "-10px", position: "absolute" }} alt=""
              ></img>
            </Modal.Body>
          </Modal>
        </form>
      </div>
      <Container fluid style={{ padding: "0" }}>
        <Container className="mt-3">
          <div>
            <div id="product-delayed" className="products my-5 py-2">
              <Row>
                {!isHide && <h1>Suggested Glasses</h1>}
                {!isHide
                  ? products.map((product) => (
                      <Col
                        key={product._id}
                        sm={6}
                        md={4}
                        lg={4}
                        className="mb-3"
                      >
                        <Product product={product}></Product>
                      </Col>
                    ))
                  : null}
              </Row>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default WebcamCapture;
