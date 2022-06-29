import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { faStripeS } from "@fortawesome/free-brands-svg-icons";


const Stripe = () => {
  const elements = useElements();
  const stripe = useStripe();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const {clientSecret} = await fetch('/api/orders/${order._id}/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            paymentMethodType: 'card',
            currency: 'cad',
        }),
    }).then(r => r.json());


  const { paymentMethod } = await stripe.confirmCardPayment(
    clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement),
        }
    }
  )
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
