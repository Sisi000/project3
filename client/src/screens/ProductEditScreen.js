import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";
import "./Screens.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};
export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageS3Key, setImageS3Key] = useState("");
  const [images, setImages] = useState([]);
  const [additionalS3, setAdditionalS3] = useState([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [lensWidth, setLensWidth] = useState("");
  const [lensHeight, setLensHeight] = useState("");
  const [bridge, setBridge] = useState("");
  const [lensDiagonal, setLensDiagonal] = useState("");
  const [templeLength, setTempleLength] = useState("");
  const [eyeRatio, setEyeRatio] = useState("");
  const [earFaceRatio, setEarFaceRatio] = useState("");
  const [cheekChinRatio, setCheekChinRatio] = useState("");
  const [noseRatio, setNoseRatio] = useState("");
  const [frameColor, setFrameColor] = useState("");
  const [prescriptionMin, setPrescriptionMin] = useState("");
  const [prescriptionMax, setPrescriptionMax] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImageS3Key(data.imageS3Key);
        setImages(data.images);
        setAdditionalS3(data.additionalS3);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setLensWidth(data.lensWidth);
        setLensHeight(data.lensHeight);
        setBridge(data.bridge);
        setLensDiagonal(data.lensDiagonal);
        setTempleLength(data.templeLength);
        setEyeRatio(data.eyeRatio);
        setEarFaceRatio(data.earFaceRatio);
        setCheekChinRatio(data.cheekChinRatio);
        setNoseRatio(data.noseRatio);
        setFrameColor(data.frameColor);
        setPrescriptionMin(data.prescriptionMin);
        setPrescriptionMax(data.prescriptionMax);
        setDescription(data.description);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          imageS3Key,
          images,
          additionalS3,
          category,
          brand,
          lensWidth,
          lensHeight,
          bridge,
          lensDiagonal,
          templeLength,
          eyeRatio,
          earFaceRatio,
          cheekChinRatio,
          noseRatio,
          frameColor,
          prescriptionMin,
          prescriptionMax,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    bodyFormData.append("oldImageS3Key", imageS3Key);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/uploadproductimage", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: "UPLOAD_SUCCESS" });

      if (forImages) {
        setImages([...image, data.image]);
        setImageS3Key([...imageS3Key, data.imageS3Key]);
      } else {
        setImage(data.image);
        setImageS3Key(data.imageS3Key);
      }
      toast.success("Image uploaded successfully. click Update to apply it");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };

  const uploadFileHandlerAdditional = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    console.log("file je", file);
    bodyFormData.append("oldImageS3KeyA", additionalS3);
    console.log("Additional oldImageS3KeyA je", additionalS3);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post(
        "/uploadadditionalimage",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: "UPLOAD_SUCCESS" });

      if (forImages) {
        setImages([...images, data.images]);
        setAdditionalS3([...additionalS3, data.additionalS3]);
      } else {
        setImages(data.images);
        setAdditionalS3(data.additionalS3);
      }
      toast.success("Image uploaded successfully. click Update to apply it");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };

  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    console.log(additionalS3.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    setAdditionalS3(additionalS3.filter((x) => x !== fileName));

    const { data } = await axios.post(
      "/deleteadditionals3",
      fileName,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    console.log("result is", data);

    toast.success("Image removed successfully. click Update to apply it");
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Edit Product ${productId}</title>
      </Helmet>
      <h1>Edit Product {productId}</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image File</Form.Label>
            <Form.Control
              value={image}
              disabled={true}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="imageS3Key">
            <Form.Control
              value={imageS3Key}
              disabled={true}
              onChange={(e) => setImageS3Key(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler} />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="images">
            <Form.Label>Additional Images</Form.Label>
            {images.length === 0 && <MessageBox>No image</MessageBox>}
            <ListGroup variant="flush">
              {images.map((x) => (
                <ListGroup.Item key={x}>
                  {x}
                  <Button variant="light" onClick={() => deleteFileHandler(x)}>
                    <i className="fa fa-times-circle"></i>
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="additionalS3">
            <Form.Control
              value={additionalS3}
              onChange={(e) => setAdditionalS3(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="additionalImageFile">
            <Form.Label>Upload Additional Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => uploadFileHandlerAdditional(e, true)}
            />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lensWidth">
            <Form.Label>Lens Width</Form.Label>
            <Form.Control
              value={lensWidth}
              onChange={(e) => setLensWidth(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lensHeight">
            <Form.Label>Lens Height</Form.Label>
            <Form.Control
              value={lensHeight}
              onChange={(e) => setLensHeight(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bridge">
            <Form.Label>Bridge</Form.Label>
            <Form.Control
              value={bridge}
              onChange={(e) => setBridge(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lensDiagonal">
            <Form.Label>Lens Diagonal</Form.Label>
            <Form.Control
              value={lensDiagonal}
              onChange={(e) => setLensDiagonal(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="templeLength">
            <Form.Label>Temple length</Form.Label>
            <Form.Control
              value={templeLength}
              onChange={(e) => setTempleLength(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eyeRatio">
            <Form.Label>Eye Ratio H/V</Form.Label>
            <Form.Control
              value={eyeRatio}
              onChange={(e) => setEyeRatio(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="earFaceRatio">
            <Form.Label>Ear/Face Ratio</Form.Label>
            <Form.Control
              value={earFaceRatio}
              onChange={(e) => setEarFaceRatio(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cheekChinRatio">
            <Form.Label>Cheek/Chin Ratio</Form.Label>
            <Form.Control
              value={cheekChinRatio}
              onChange={(e) => setCheekChinRatio(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="noseRatio">
            <Form.Label>Nose Ratio W/H</Form.Label>
            <Form.Control
              value={noseRatio}
              onChange={(e) => setNoseRatio(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="frameColor">
            <Form.Label>Frame Color</Form.Label>
            <Form.Control
              value={frameColor}
              onChange={(e) => setFrameColor(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="prescriptionMin">
            <Form.Label>Prescription Min</Form.Label>
            <Form.Control
              value={prescriptionMin}
              onChange={(e) => setPrescriptionMin(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="prescriptionMax">
            <Form.Label>Prescription Max</Form.Label>
            <Form.Control
              value={prescriptionMax}
              onChange={(e) => setPrescriptionMax(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  );
}
