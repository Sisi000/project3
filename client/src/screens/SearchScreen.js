import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import Rating from "../components/Rating";
import { axiosPost, axiosGet } from "../components/AxiosHelper";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
// import Button from "react-bootstrap/Button";
import Product from "../components/Product";
import LinkContainer from "react-router-bootstrap/LinkContainer";
// import { Form } from "react-bootstrap";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import "./Screens.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "$1 to $100",
    value: "1-100",
  },
  {
    name: "$101 to $200",
    value: "101-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

export default function SearchScreen({ items }) {
  // const navigate = useNavigate();
  // const { search } = useLocation();
  // const sp = new URLSearchParams(search); // /search?category=Oval
  // const category = sp.get("category") || "all";
  // const frameColor = sp.get("frameColor") || "all";
  // const query = sp.get("query") || "all";
  // const price = sp.get("price") || "all";
  // const rating = sp.get("rating") || "all";
  // const order = sp.get("order") || "newest";
  // const page = sp.get("page") || 1;

  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFrameColors, setSelectedFrameColors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [countProducts, setCountProducts] = useState(0);
  const [order, setOrder] = useState("newest");

  const [{ loading, error, pages }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `/api/products/`;
        const { data } = await axiosGet(endpoint);
        // dispatch({ type: "SUCCESS", payload: data });
        console.log("data get all", data);
        setProducts(data);
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = "/api/products/search";
        const payload = {
          selectedCategories,
          selectedFrameColors,
          selectedPrices,
          selectedRatings,
          order,
        };
        const result = await axiosPost(endpoint, payload);
        console.log("result is", result.data);
        setProducts(result.data.results);
        setCountProducts(result.data.countProducts);
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [
    selectedCategories,
    selectedFrameColors,
    selectedPrices,
    selectedRatings,
    order,
  ]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const endpoint = `/api/products/categories`;
        const { data } = await axiosGet(endpoint);
        setCategories(data);
        // setSelectedCategories([]);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const [frameColors, setFrameColors] = useState([]);
  useEffect(() => {
    const fetchFrameColors = async () => {
      try {
        const endpoint = `/api/products/framecolors`;
        const { data } = await axiosGet(endpoint);
        setFrameColors(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchFrameColors();
  }, [dispatch]);

  // const getFilterUrl = (filter) => {
  //   // const filterPage = filter.page || page;
  //   const filterCategory = filter.category || category;
  //   const filterFrameColor = filter.frameColor || frameColor;
  //   const filterQuery = filter.query || query;
  //   const filterRating = filter.rating || rating;
  //   const filterPrice = filter.price || price;
  //   const sortOrder = filter.order || order;
  //   return `/search?category=${filterCategory}&query=${filterQuery}&frameColor=${filterFrameColor}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  // };

  const CheckboxMenu = React.forwardRef(
    (
      {
        children,
        style,
        className,
        "aria-labelledby": labeledBy,
        onSelectAll,
        onSelectNone,
      },
      ref
    ) => {
      return (
        <div
          ref={ref}
          style={style}
          className={`${className} CheckboxMenu`}
          aria-labelledby={labeledBy}
        >
          <div
            className="d-flex flex-column"
            style={{ maxHeight: "calc(100vh)", overflow: "none" }}
          >
            <ul
              className="list-unstyled flex-shrink mb-0"
              style={{ overflow: "auto" }}
            >
              {children}
            </ul>
            <div className="dropdown-item border-top pt-2 pb-0">
              <ButtonGroup size="sm">
                <Button variant="link" onClick={onSelectAll}>
                  Select All
                </Button>
                <Button variant="link" onClick={onSelectNone}>
                  Select None
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      );
    }
  );

  const CheckDropdownItem = React.forwardRef(
    ({ children, id, checked, onChange }, ref) => {
      return (
        <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
          <Form.Check
            type="checkbox"
            label={children}
            checked={checked}
            onChange={onChange && onChange.bind(onChange, id)}
          />
        </Form.Group>
      );
    }
  );

  const toggleCategory = (category) => {
    let newCategories = [...selectedCategories];
    if (newCategories.includes(category)) {
      newCategories = newCategories.filter((c) => c !== category);
    } else {
      newCategories.push(category);
    }
    setSelectedCategories(newCategories);
  };

  const toggleFrameColor = (frameColor) => {
    let newFrameColors = [...selectedFrameColors];
    if (newFrameColors.includes(frameColor)) {
      newFrameColors = newFrameColors.filter((f) => f !== frameColor);
    } else {
      newFrameColors.push(frameColor);
    }
    setSelectedFrameColors(newFrameColors);
  };

  const togglePrice = (price) => {
    let newPrices = [...selectedPrices];
    console.log("newPrices is", newPrices);
    console.log("price is", price);
    if (newPrices.includes(price)) {
      newPrices = newPrices.filter((p) => p !== price);
    } else {
      newPrices.push(price);
    }
    setSelectedPrices(newPrices);
  };

  const toggleRating = (rating) => {
    let newRatings = [...selectedRatings];
    if (newRatings.includes(rating)) {
      newRatings = newRatings.filter((r) => r !== rating);
    } else {
      newRatings.push(rating);
    }
    setSelectedRatings(newRatings);
  };

  const handleSelectAll = (setter, values) => {
    setter([...values]);
  };

  const handleSelectNone = (setter) => {
    setter([]);
  };

  const handleRemoveSelection = () => {
    setSelectedCategories([]);
    setSelectedFrameColors([]);
    setSelectedPrices([]);
    setSelectedRatings([]);
  };

  return (
    <>
      <Container fluid style={{ padding: "0" }}>
        {/* <div className="container-search"> */}

        <Helmet>
          <title>Search Products</title>
        </Helmet>
        {/* <Row> */}

        <div className="dropdown-container">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">Frame Shape</Dropdown.Toggle>

            <Dropdown.Menu
              as={CheckboxMenu}
              onSelectAll={() => {
                handleSelectAll(setSelectedCategories, categories);
              }}
              onSelectNone={() => {
                handleSelectNone(setSelectedCategories);
              }}
            >
              {categories.map((c) => (
                <Dropdown.Item
                  key={c}
                  as={CheckDropdownItem}
                  id={c}
                  onChange={() => toggleCategory(c)}
                  checked={selectedCategories.includes(c)}
                >
                  {c}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">Frame Color</Dropdown.Toggle>

            <Dropdown.Menu
              as={CheckboxMenu}
              onSelectAll={() => {
                handleSelectAll(setSelectedFrameColors, frameColors);
              }}
              onSelectNone={() => {
                handleSelectNone(setSelectedFrameColors);
              }}
            >
              {frameColors.map((f) => (
                <Dropdown.Item
                  key={f}
                  as={CheckDropdownItem}
                  id={f}
                  onChange={() => toggleFrameColor(f)}
                  checked={selectedFrameColors.includes(f)}
                >
                  {f}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Price
            </Dropdown.Toggle>

            <Dropdown.Menu
              as={CheckboxMenu}
              onSelectAll={() => {
                handleSelectAll(setSelectedPrices, prices);
              }}
              onSelectNone={() => {
                handleSelectNone(setSelectedPrices);
              }}
            >
              {prices.map((p) => (
                <Dropdown.Item
                  key={p.value}
                  as={CheckDropdownItem}
                  id={p}
                  onChange={() => togglePrice(p.value)}
                  checked={selectedPrices.includes(p.value)}
                >
                  {p.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Avg. Customer Review
            </Dropdown.Toggle>

            <Dropdown.Menu
              as={CheckboxMenu}
              onSelectAll={() => {
                handleSelectAll(setSelectedRatings, ratings);
              }}
              onSelectNone={() => {
                handleSelectNone(setSelectedRatings);
              }}
            >
              {ratings.map((r) => (
                <Dropdown.Item
                  key={r.name}
                  as={CheckDropdownItem}
                  id={r}
                  onChange={() => toggleRating(r.rating)}
                  checked={selectedRatings.includes(r.rating)}
                >
                  <Rating caption={" & up"} rating={r.rating}></Rating>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="products my-5 py-2">
          <>
            <Row className="justify-content-between mb-3">
              <Col md={6}>
                <div>
                  {countProducts === 0 ? "No" : countProducts} Results
                  {/* {query !== "all" && " : " + query} */}
                  {selectedCategories.length > 0 && " : " + selectedCategories}
                  {selectedFrameColors.length > 0 &&
                    " : " + selectedFrameColors}
                  {selectedPrices.length > 0 && " Price " + selectedPrices[0]}
                  {selectedRatings.length > 0 &&
                    " : Rating " + selectedRatings + " & up"}
                  {selectedCategories !== "all" ||
                  selectedRatings !== "all" ||
                  selectedPrices !== "all" ? (
                    <Button
                      variant="light"
                      onClick={() => {
                        handleRemoveSelection();
                      }}
                    >
                      <i className="fas fa-times-circle"></i>
                    </Button>
                  ) : null}
                </div>
              </Col>
              <Col className="text-end">
                Sort by{" "}
                <select
                  value={order}
                  onChange={(e) => {
                    setOrder(e.target.value);
                  }}
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price: High to Low</option>
                  <option value="toprated">Avg. Customer Reviews</option>
                </select>
              </Col>
            </Row>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}

            <Row>
              {products.map((product) => (
                <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>

            {/* <div>
            {[...Array(pages).keys()].map((x) => (
              <LinkContainer
                key={x + 1}
                className="mx-1"
                to={getFilterUrl({ page: x + 1 })}
              >
                <Button
                  className={Number(page) === x + 1 ? "text-bold" : ""}
                  variant="light"
                >
                  {x + 1}
                </Button>
              </LinkContainer>
            ))}
          </div> */}
          </>
        </div>
        {/* </div> */}
      </Container>
    </>
  );
}
