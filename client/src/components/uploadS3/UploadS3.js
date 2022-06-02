import { useState } from "react";
import axios from "axios";
import "./UploadS3.css";
import imgphoto from "../../assets/photo.png";

async function postImage({ image }) {
  const formData = new FormData();
  formData.append("image", image);

  const result = await axios.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

function UploadS3() {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

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
  };

  const showAlert = () => {
    alert("Photo uploaded successfully");
  };

  return (
    <div className="containers3">
      <div className="containerphoto">
        <img className="imgphoto" src={imgphoto} alt="" />
        <span>&nbsp;Choose Photo</span>
      </div>
      <form className="forms3" onSubmit={submit}>
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
        <button className="button-4" type="submit" onClick={showAlert}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default UploadS3;
