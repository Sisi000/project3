import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [resultData, setResultData] = useState([]);
  const webcamRef = React.useRef(null);

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("/uploadwebcam", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Suggested glasses are", result.data.results);
    setResultData(result.data.results, ...resultData);

    return result.data.results;
  }

  const capture = React.useCallback(() => {
    const file = webcamRef.current.getScreenshot();
    setFile(file);
  });

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file });
    setImages([result.images, ...images]);
  };

  return (
    <div className="webcam-container">
      <form className="forms3" onSubmit={submit}>
        <div className="webcam-img">
          {images === "" ? (
            <Webcam
              audio={false}
              height={400}
              ref={webcamRef}
              screenshotFormat="image/*"
              width={400}
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={images} alt="" />
          )}
        </div>
        <div>
          {images !== "" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setImages("");
              }}
              className="webcam-btn"
            >
              Retake Image
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="webcam-btn"
            >
              Capture
            </button>
          )}
        </div>
        <button className="button-4" type="submit">
          Submit
        </button>
        <div className="suggested-glasses" id="suggestedglasses">
          "Suggested glasses are " {resultData}
        </div>
      </form>
    </div>
  );
}
export default WebcamCapture;
