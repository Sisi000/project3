import { useState } from "react";
import axios from "axios";
import "./UploadS3.css";
import imgphoto from "../../assets/photo.png";
import UploadUrl from "../uploadUrl/UploadUrl";

function UploadS3() {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [resultData, setResultData] = useState([]);

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // alert("Suggested glasses are " + JSON.stringify(result.data.results));
    console.log("Suggested glasses are", result.data.results);
    setResultData(result.data.results, ...resultData);
    
    return result.data.results;
  }
  
  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file });
    setImages([result.image, ...images]);
    setFile(null);
    document.getElementById("selectedimage").value = "";
  };
  
  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
    document.getElementById("suggestedglasses").value = ""
  };

  // const showAlert = () => {
  //   alert("Photo uploaded successfully");
  // };

  return (
    <div className="containers3">
      <form className="forms3" onSubmit={submit}>
        <div className="containerphoto">
          <img className="imgphoto" src={imgphoto} alt="" />
          <span>&nbsp;Choose Photo</span>
        </div>
        <input
          id="selectedimage"
          onChange={fileSelected}
          type="file"
          accept="image/*"
        ></input>
        <div className="imgcontainer">
          {file && (
            <div className="preview">
              <img
                src={URL.createObjectURL(file)}
                className="imagePreview"
                alt="Thumb"
              />
            </div>
          )}
        </div>
        {/* <button className="button-4" type="submit" onClick={showAlert}> */}
        <button className="button-4" type="submit">
          Submit
        </button>
        <div className="suggested-glasses" id="suggestedglasses">"Suggested glasses are " {resultData}</div>
      </form>
      <UploadUrl />
    </div>
  );
}

export default UploadS3;
