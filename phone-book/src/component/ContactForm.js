import React, { useState, useEffect } from "react";
import InputText from "./InputText";
import Button from "./Button";
import { useDispatch } from "react-redux";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);

  const dispatch = useDispatch();

  const addContact = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_CONTACT", payload: { name, phoneNumber } });
    setName("");
    setPhoneNumber("");
    event.target.name.value = "";
    event.target.phonenumber.value = "";
  };

  return (
    <form onSubmit={addContact}>
      <div className="mb-6">
        <InputText
          title="Name"
          instructions="Enter name"
          setName={setName}
          setChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <div className="mb-6">
        <InputText
          title="Phone Number"
          instructions="Enter phone number"
          setPhoneNumber={setPhoneNumber}
          setChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
        />
      </div>
      <Button title="Create" />
    </form>
  );
};

export default ContactForm;
