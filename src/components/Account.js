import React, { useLayoutEffect, useState } from "react";
import Card from "@kiwicom/orbit-components/lib/Card";
import CardSection from "@kiwicom/orbit-components/lib/Card/CardSection";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Button from "@kiwicom/orbit-components/lib/Button";
import styled from "styled-components";
import * as firebase from "firebase";

const Container = styled.div`
  margin: 0 auto;
  max-width: 50rem;
`;

const Account = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

  const db = firebase.firestore();
  const onSubmit = () => {
    const uid = firebase.auth().currentUser.uid;
    db.collection("users").doc(uid).set({ name, address, phone, extraInfo });
  };

  useLayoutEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    db.collection("users")
      .doc(uid)
      .get()
      .then((user) => {
        const { name, address, phone, extraInfo } = user.data();
        setName(name);
        setAddress(address);
        setPhone(phone);
        setExtraInfo(extraInfo);
      });
  }, []);
  return (
    <Container>
      <Card>
        <CardSection>Change Account Information</CardSection>
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </CardSection>
      </Card>
    </Container>
  );
};

export default Account;
