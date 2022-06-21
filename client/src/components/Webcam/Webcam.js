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
  const [file, setFile] = useState("");
  const [resultData, setResultData] = useState([]);
  const webcamRef = React.useRef(null);

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("/uploadwebcam", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Suggested glasses are", result.data[0]);
    setResultData([result.data, ...resultData]);
    return result.data;
  }

  const capture = React.useCallback(() => {
    const file = webcamRef.current.getScreenshot();
    setFile(file);
  });

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file });
    setFile(result.image);
  };

  return (
    <div className="webcam-container">
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
                setResultData("");
              }}
              className="button-5"
            >
              Retake Image
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="button-5"
            >
              Capture
            </button>
          )}
        </div>
        <button className="button-4" type="submit">
          Submit
        </button>
        <div className="suggested-glasses" id="suggestedglasses">
          Suggested glasses are
          <br /> {resultData}
        </div>
      </form>
    </div>
  );
}

export default WebcamCapture;
