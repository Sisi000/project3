import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./Store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <HelmetProvider>
      <PayPalScriptProvider deferLoading={true}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </PayPalScriptProvider>
    </HelmetProvider>
  </StoreProvider>
);
