import { useState } from "react";
import axios from "axios";
import "./UploadUrl.css";
// import imgphoto from "../../assets/photo.png";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../Product";

function UploadUrl2() {
  const [file, setFile] = useState("");
  const [resultData, setResultData] = useState([]);
  const [products, setProducts] = useState([]);

  const changeUrl = (e) => {
    const { value } = e.target;
    console.log("value is", value);
    setFile(value);
  };

  const submit = async (event) => {
    event.preventDefault();
    const URL  = file;
    console.log("URL is", URL);

    const userfilters = {//dummy filter dataset
      filters: {
        color: null,
        price: null,
        size: null,
        shape: "Square",
        n: 5,
      }
    }

    await axios.post("/uploadurl", { URL,userfilters } ).then((res) => {
      alert("Suggested glasses are " + res.data);
      setResultData(res.data);
      // return res.data;
    });
  };

  const showSuggested = async () => {
    const params = resultData;
    console.log("resultData is", resultData);
    const result2 = await axios.post(`/api/products/id`, { params });
    setProducts(result2.data, ...products);
  };

  return (
    <div className="containers3">
      <div className="container-url">
        <form className="formsUrl">
          Enter image Url
          <input type="text" name="URL" value={file} onChange={changeUrl} />
          <button className="button-2" onClick={submit}>
            Submit
          </button>
          <img className="imagePreview" src={file} alt=""></img>
        </form>
      </div>
      <div className="container-suggestion">
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
    </div>
  );
}

export default UploadUrl2;
