import { useState } from "react";
import axios from "axios";
import "./UploadS3.css";
import imgphoto from "../../assets/photo.png";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../Product";

function UploadS3() {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [products, setProducts] = useState([]);

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Suggested glasses are", result.data);
    setResultData(result.data);

    return result.data;
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
    setResultData("");
    // document.getElementById("suggestedglasses").value = "";
  };

  const showSuggested = async () => {
    const params = resultData;
    console.log("resultData is", resultData);
    const result2 = await axios.post(`/api/products/id`, { params });
    setProducts(result2.data, ...products);
  };

  return (
    <div className="containers3">
      <div className="container-uploads">
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
          <button className="button-4" type="submit">
            Submit
          </button>
        </form>
      </div>
      <Container fluid style={{ padding: "0" }}>
        <Container className="mt-3">
          <div className="suggestedglasses">
            <div className="products my-5 py-2">
              <Row>
                <h1>Suggested glasses</h1>
                {products.map((product) => (
                  <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Container>
        <button
          onClick={(e) => {
            e.preventDefault();
            showSuggested();
          }}
          className="button-5"
        >
          Show
        </button>
      </Container>
    </div>
  );
}

export default UploadS3;
