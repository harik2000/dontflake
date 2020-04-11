import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import config from "../config";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import "./Settings.css";

export default function Settings() {
    const [stripe, setStripe] = useState(null);

    useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY));
    }, []);

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details) {
    return;
  }

  async function handleFormSubmit({ token, error }) {
    if (error) {
      onError(error);
      return;
    }
  
    setIsLoading(true);
  
    try {
      await billUser({
        source: token.id
      });
  
      alert("Your card information has been saved securely!");
      history.push("/events");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  return (
    <div className="Settings">
      <StripeProvider stripe={stripe}>
        <Elements>
          <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </div>
  );
}