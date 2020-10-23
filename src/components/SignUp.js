import React, { useState } from "react";
import Card from "@kiwicom/orbit-components/lib/Card";
import CardSection from "@kiwicom/orbit-components/lib/Card/CardSection";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import styled from "styled-components";
import Button from "@kiwicom/orbit-components/lib/Button";
import * as firebase from "firebase";

const Container = styled.div`
  margin: 0 auto;
  max-width: 50rem;
`;
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [invoiceName, setInvoiceName] = useState("");
  const [billerEmail, setBillerEmail] = useState("");
  const db = firebase.firestore();
  const onSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return db.collection("users").doc(user.user.uid).set({
          name,
          address,
          phone,
          extraInfo,
        });
      })
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Card>
        <CardSection>Sign up</CardSection>
        <CardSection>
          <InputField
            required
            label="Email"
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
            type="email"
            value={email}
          />
        </CardSection>
        <CardSection>
          <InputField
            required
            label="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
        </CardSection>
        <CardSection>
          <InputField
            required
            label="Name"
            placeholder="Name"
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
        </CardSection>
        <CardSection>
          <InputField
            required
            label="Address"
            placeholder="Address"
            onChange={(ev) => setAddress(ev.target.value)}
            value={address}
          />
        </CardSection>
        <CardSection>
          <InputField
            required
            label="Phone Number"
            placeholder="Phone Number"
            onChange={(ev) => setPhone(ev.target.value)}
            value={phone}
          />
        </CardSection>
        <CardSection>
          <InputField
            label="Extra Info"
            placeholder="Extra Info"
            onChange={(ev) => setExtraInfo(ev.target.value)}
            value={extraInfo}
          />
        </CardSection>
        <CardSection>
          <InputField
            label="Biller Name"
            placeholder="Biller Name"
            onChange={(ev) => setInvoiceName(ev.target.value)}
            value={invoiceName}
          />
        </CardSection>
        <CardSection>
          <InputField
            label="Biller Email"
            placeholder="Biller Email"
            onChange={(ev) => setBillerEmail(ev.target.value)}
            value={billerEmail}
          />
        </CardSection>
        <CardSection>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </CardSection>
      </Card>
    </Container>
  );
};

export default SignUp;
