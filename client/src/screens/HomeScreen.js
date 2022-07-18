import { useEffect, useReducer } from "react";
import {axiosGet} from "../components/AxiosHelper"
// import logger from "use-reducer-logger";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Slider from "../components/Home/Slider";
import Cards from "../components/Home/Cards";
import TryOn from "../components/Home/tryOn";
import SearchScreen from "./SearchScreen";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer((reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const endpoint = "/api/products"
        const result = await axiosGet(endpoint);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Container fluid style={{ padding: "0" }}>
        <Slider />
        {/* <Cards /> */}
        <Container className="my-5 pt-5">
          <div>
            <Helmet>
              <title>eyelovecoding</title>
            </Helmet>
            <SearchScreen />
            {/* <h1>Featured Products</h1>
            <div className="products my-5 py-2">
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <Row>
                  {products.map((product) => (
                    <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Row>
              )}
            </div> */}
          </div>
        </Container>
        <TryOn />
      </Container>
    </>
  );
}
export default HomeScreen;
