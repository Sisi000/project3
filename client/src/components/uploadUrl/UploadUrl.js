import { useState } from "react";
import {axiosPost} from "../AxiosHelper";
import "./UploadUrl.css";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../Product";


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
    setFile(null);
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

  return (
    <div className="containers3">
      <div className="container-url">
        <form className="formsUrl">
          Enter image Url
          <input
            id="enteredUrl"
            type="text"
            name="URL"
            value={file}
            onChange={changeUrl}
          />
          <button className="btn btn-primary" onClick={submit}>
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
                  {products.length > 0 && <h1>Suggested Glasses</h1>}
                  {products.map((product) => (
                    <Col
                      key={product._id}
                      sm={3}
                      md={3}
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
