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

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file });
    setImages([result.image, ...images]);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  // const allimages = async () => {
  //   try {
  //     let response = await fetch("/allimages");
  //     // let allimages = await response.json();
  //     return setImages(response);
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // };

  // useEffect(() => {
  //   allimages();
  // }, []);

  return (
    <div className="containers3">
      <form className="forms3" onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button className="btn-s3" type="submit">
          Submit
        </button>
      </form>

      {images.map((image) => (
        <div key={image}>
          <img src={image} alt=""></img>
        </div>
      ))}

      <img
        className="fetchimg"
        src="/images/a0b7358dd124b140f1cd813de1778223"
        alt=""
      ></img>
    </div>
  );
}

export default UploadS3;
