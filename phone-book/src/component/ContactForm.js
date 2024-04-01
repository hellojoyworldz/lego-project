import React, { useState } from "react";
import InputText from "./InputText";
import Button from "./Button";
import { useDispatch } from "react-redux";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();

  const addContact = (event) => {
    event.preventDefault();
    if (event.target.name.value === "") {
      alert("Enter name");
      event.target.name.focus();
      return;
    } else if (event.target.phonenumber.value === "") {
      alert("Enter phone number");
      event.target.phonenumber.focus();
      return;
    } else {
      dispatch({ type: "ADD_CONTACT", payload: { name, phoneNumber } });
      setName("");
      setPhoneNumber("");
      event.target.name.value = "";
      event.target.phonenumber.value = "";
    }
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
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
            setPhoneNumber(event.target.value);
          }}
        />
      </div>
      <Button title="Create" />
    </form>
  );
};

export default ContactForm;
