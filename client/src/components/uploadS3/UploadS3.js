import { useState } from "react";
import axios from "axios";
import "./UploadS3.css";

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
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file });
    setImages([result.image, ...images]);
      };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="containers3">
      <form className="forms3" onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button className="button-4" type="submit">
          Submit
        </button>
      </form>
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
  );
}

export default UploadS3;
