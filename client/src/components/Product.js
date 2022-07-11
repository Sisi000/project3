import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { FiHeart } from 'react-icons/fi';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card style={{ boxShadow: "4px 4px 20px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)", borderColor: "white"}}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.slug} onMouseOver={e => e.currentTarget.src = product.images} onMouseOut={e => (e.currentTarget.src = product.image)}/>
      </Link>
      <Card.Body >
        <Link  style={{textDecoration: 'none'}} to={`/product/${product.slug}`}>
          <Card.Title style={{ color:'#000000', fontWeight: 'bold' }}>{product.brand}</Card.Title>
          <Card.Title style={{ color:'#686868' }}>{product.slug}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button variant="primary" onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
<FiHeart style={{marginLeft:"90px"}}/>
      </Card.Body>
    </Card>
  );
}
export default Product;
