import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Events.css";

function Events({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return (
      fields.name !== "" &&
      fields.startdate !== "" && 
      fields.starttime !== "" && 
      fields.description !== "" && 
      fields.location !== "" && 
      fields.flake !== "" &&
      fields.friends != ""
    );
  }

  async function handleSubmitClick(event) {
   
  }

  return (
    <div>
    <form className="BillingForm" onSubmit={handleSubmitClick}>
      <h1 className="credit_title">Add Credit Card</h1>
      <div className="card_field">
        <FormGroup bsSize="large" controlId="name">
          <ControlLabel>Event name</ControlLabel>
          <FormControl
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
            placeholder="Nish's Birthday Party"
          />
        </FormGroup>

        <FormGroup bsSize="large" controlId="startdate">
          <ControlLabel>Start Date</ControlLabel>
          <FormControl
            type="text"
            value={fields.startdate}
            onChange={handleFieldChange}
            placeholder="April 11th"
          />
        </FormGroup>

        <FormGroup bsSize="large" controlId="starttime">
          <ControlLabel>Start Time</ControlLabel>
          <FormControl
            type="text"
            value={fields.starttime}
            onChange={handleFieldChange}
            placeholder="7PM"
          />
        </FormGroup>

        <FormGroup bsSize="large" controlId="description">
          <ControlLabel>Event Description</ControlLabel>
          <FormControl
            type="text"
            value={fields.description}
            onChange={handleFieldChange}
            placeholder="Come have a litty time at Nish's bday!!"
          />
        </FormGroup>

        <FormGroup bsSize="large" controlId="location">
          <ControlLabel>Location</ControlLabel>
          <FormControl
            type="text"
            value={fields.location}
            onChange={handleFieldChange}
            placeholder="Startup UCLA"
          />
        </FormGroup>

        <FormGroup bsSize="large" controlId="flake">
          <ControlLabel>Cost to Flake</ControlLabel>
          <FormControl
            type="text"
            value={fields.flake}
            onChange={handleFieldChange}
            placeholder="$5 to miss out"
          />
        </FormGroup>

        <FormGroup bsSize="large" controlId="friends">
          <ControlLabel>Invite Friends</ControlLabel>
          <FormControl
            type="text"
            value={fields.friends}
            onChange={handleFieldChange}
            placeholder="Be there or be square"
          />
        </FormGroup>
        <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Create
      </LoaderButton>

      </div>
     
    </form>
   </div>
  );
}
export default Events;

