import { useState } from "react";
import {axiosPost} from "../AxiosHelper";
import "./UploadUrl.css";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../Product";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import scan from "../../assets/scan.gif";


function UploadUrl2(props) {
  const filters = props.filters;

  const [file, setFile] = useState("");
  const [products, setProducts] = useState([]);

  const changeUrl = (e) => {
    const { value } = e.target;
    //console.log("value is", value);
    setFile(value);
    setProducts([]);
  };

  const submit = async (event) => {
    event.preventDefault();
    const URL = file;
    //console.log("URL is", URL);
    const endpoint = "/uploadurl";
    const payload = { URL, filters };
    await axiosPost(endpoint, payload)
      .then((result) => {
        showSuggested(result.data);
        //console.log("result from submit is", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
      handleShow();
    // setFile(null);
    document.getElementById("enteredUrl").value = "";
    // return res.data;
  };

  const showSuggested = async (result) => {
    const params = result;
    const endpoint = `/api/products/id`;
    const payload = { params };
    const result2 = await axiosPost(endpoint, payload);
    setProducts(result2.data, ...products);
  };

  
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3800);
  };

  const [isHide, setIsHide] = useState(true);
  if (products.length > 0) {
    setTimeout(() => setIsHide(false), 3800);
    clearTimeout(setIsHide);
  }


  return (
<>
      <div className="container-url">
        <form className="formsUrl">
        <b>Instructions:</b>
        <p>Optional: Tell the virtual optician a few preferences with the filters</p>
        <p>1) Find a picture of a subject on the internet. Ensure the subject is facing the camera with their face fully visible.</p>
        <p>2) Enter and submit the url to the virtual optician.</p>
        <p>3) See what products fit the face!</p>
        <br/>

          Enter image Url
          <input
            id="enteredUrl"
            type="text"
            name="URL"
            value={file}
            onChange={changeUrl}
          />
       
         
          <Modal
            style={{
              visibility: "hidden",
              marginTop: "350px",
              position: "absolute",
            }}
            show={show}
          >
            <Modal.Body style={{ visibility: "visible", marginTop: "200px" }}>
              <img
                src={scan}
                style={{ width: "105%", marginLeft: "-20px", position: "absolute" }} alt=""
              ></img>
            </Modal.Body>
          </Modal>
          </form>
          {isHide !== true ? (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setFile("");
                  setProducts([]);
                  setIsHide(true);
                }}
                className="btn btn-primary"
              >
                Clear
              </Button>
            ) : (
          <Button className="btn btn-primary" onClick={submit}>
            Submit
          </Button>
            )}
        <img className="imagePreviewUrl" src={file} alt=""></img>
     
      <div className="container-suggestion">
        <Container fluid style={{ padding: "0" }}>
          <Container className="mt-3">
            <div className="suggestedglasses">
              <div className="products my-5 py-2">
                               <Row>
            {!isHide && <h1>Suggested Glasses</h1>}
                {!isHide
                  ? products.map((product) => (
                <Col key={product._id} sm={6} md={4} lg={4} className="mb-3">
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
      </div>
      </>
  );
}

export default UploadUrl2;
