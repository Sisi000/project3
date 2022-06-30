import React from "react";
// import {useNavigate} from 'react-router-dom';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


const Stripe = () => {
  const elements = useElements();
  const stripe = useStripe();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);
    console.log('card', cardElement);
    console.log('stripe', stripe);
    if (!stripe || !elements) {
      return;
    }
  
};
  return (
    <>
      <h1>Card</h1>
      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card-element">Card</label>
        <CardElement id="card-element" />
        <button>Pay</button>
      </form>
    </>
  );
};

export default Stripe;
