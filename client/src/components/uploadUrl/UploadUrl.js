import { useState } from "react";
import axios from "axios";
import "./UploadUrl.css";
// import imgphoto from "../../assets/photo.png";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../Product";

function UploadUrl2(props) {
  const filters = props.filters;

  const [file, setFile] = useState("");
  const [products, setProducts] = useState([]);

  const changeUrl = (e) => {
    const { value } = e.target;
    console.log("value is", value);
    setFile(value);
  };

  const submit = async (event) => {
    event.preventDefault();
    const URL = file;
    console.log("URL is", URL);

    await axios
      .post("/uploadurl", { URL, filters })
      .then((result) => {
        showSuggested(result.data);
        console.log("result from submit is", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
      setFile(null);
      document.getElementById("enteredUrl").value = "";
    // return res.data;
  };

  const showSuggested = async (result) => {
    const params = result;
    const result2 = await axios.post(`/api/products/id`, { params });
    setProducts(result2.data, ...products);
  };

  return (
    <div className="containers3">
      <div className="container-url">
        <form className="formsUrl">
          Enter image Url
          <input id="enteredUrl" type="text" name="URL" value={file} onChange={changeUrl} />
          <button className="button-2" onClick={submit}>
            Submit
          </button>
        </form>
          <img className="imagePreview" src={file} alt=""></img>
      </div>
      <div className="container-suggestion">
        <Container fluid style={{ padding: "0" }}>
          <Container className="mt-3">
            <div className="suggestedglasses">
              <div className="products my-5 py-2">
                <Row>
                  <h1>Suggested glasses</h1>
                  {products.map((product) => (
                    <Col
                      key={product._id}
                      sm={6}
                      md={4}
                      lg={3}
                      className="mb-3"
                    >
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default UploadUrl2;
