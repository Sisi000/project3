import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import StatusMessages, {useMessage} from './StatusMessages';

const Card = () => {
  const elements = useElements();
  const stripe = useStripe();
// const [messages, addMessage] = useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const {clientSecret} = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            paymentMethodType: 'card',
            currency: 'cad',
        }),
    }).then(r => r.json());
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: "card",
    //     card: elements.getElement(CardElement),
    //     });
    // if (error) {
    //     console.log("error", error);
    //     }
  

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
      {/* <StatusMessages messages={messages} /> */}
    </>
  );
};

export default Card;
