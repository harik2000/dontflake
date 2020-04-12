import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./BillingForm.css";

function BillingForm({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    storage: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return (
      fields.name !== "" &&
      isCardComplete
    );
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);

    const { token, error } = await props.stripe.createToken({ name: fields.name });

    setIsProcessing(false);

    onSubmit({ token, error });
  }

  return (
    <div>
    <form className="BillingForm" onSubmit={handleSubmitClick}>
      <h1 className="credit_title">Add Credit Card</h1>
      <div className="card_field">
      <FormGroup bsSize="large" controlId="name">
        <ControlLabel>Cardholder&apos;s name</ControlLabel>
        <FormControl
          type="text"
          value={fields.name}
          onChange={handleFieldChange}
          placeholder="Name on the card"
        />
      </FormGroup>
      <ControlLabel>Credit Card Info</ControlLabel>
      <CardElement
        className="card-field"
        onChange={e => setIsCardComplete(e.complete)}
        style={{
          base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
        }}
      />
      </div>
      <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Continue
      </LoaderButton>
    </form>
   </div>
  );
}

export default injectStripe(BillingForm);