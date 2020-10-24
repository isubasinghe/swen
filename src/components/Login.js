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
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <Card>
        <CardSection>Sign into app</CardSection>
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </CardSection>
      </Card>
    </Container>
  );
};

export default Login;
