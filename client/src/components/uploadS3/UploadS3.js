import { useState } from "react";
import "./UploadS3.css";
import imgphoto from "../../assets/photo.png";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../Product";
import {axiosPost, axiosPostMPFD} from "../AxiosHelper"

function UploadS3(props) {
  const filters = props.filters;

  const [file, setFile] = useState();
  const [products, setProducts] = useState([]);

  async function postImage(filesForUpload, blob) {
    const formData = new FormData();
    formData.append("UserData", filesForUpload); //image
    formData.append("UserData", blob); //filters in Blob format
    const endpoint = "/upload";
    const result = await axiosPostMPFD(endpoint, formData);
    //console.log("Suggested glasses are", result);
    return result;
  }

  const submit = async (event) => {
    event.preventDefault();

    const filtersJSON = JSON.stringify(filters); //turn filter set to JSON
    const blob = new Blob([filtersJSON], {
      //turn filter (JSON) to blob for multipart form submittal
      type: "application/json",
    });

    const result = await postImage(file, blob)
      .then((result) => {
        showSuggested(result);
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log("Suggested glasses from submit are", result);
    setFile(null);
    document.getElementById("selectedimage").value = "";
  };
  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setProducts([]);
  };

  const showSuggested = async (result) => {
    const params = result;
    const endpoint = `/api/products/id`;
    const result2 = await axiosPost(endpoint, {params});
    setProducts(result2.data, ...products);
  };

  return (
    <div className="containers3">
      <div className="container-uploads">
        <form className="forms3" onSubmit={submit}>
        <b>Instructions:</b>
        <p>Optional: Tell the virtual optician a few preferences with the filters</p>
        <p>1) Choose a picture locally to upload. Ensure the subject is facing the camera with their face fully visible.</p>
        <p>2) Upload the picture to the virtual optician.</p>
        <p>3) See what products fit the face!</p>
        <br/>
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
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>

      <Container fluid style={{ padding: "0" }}>
        <Container className="mt-3">
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
        </Container>
      </Container>
    </div>
  );
}

export default UploadS3;
