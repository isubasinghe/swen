import React from "react";
import { useHistory } from "react-router-dom";
import NavigationBar from "@kiwicom/orbit-components/lib/NavigationBar";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import LinkList from "@kiwicom/orbit-components/lib/LinkList";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import * as firebase from "firebase";

const Nav = ({ status, routes }) => {
  const history = useHistory();
  const renderAdmin = (
    <>
      <ButtonLink
        onClick={() => {
          history.push("/admin");
        }}
        type="secondary"
      >
        Admin
      </ButtonLink>
      <ButtonLink
        onClick={() => {
          firebase.auth().signOut().then(history.push("/"));
        }}
        type="secondary"
      >
        Log out
      </ButtonLink>
    </>
  );

  const renderUser = (
    <>
      <ButtonLink
        onClick={() => {
          history.push("/account");
        }}
        type="secondary"
      >
        Account
      </ButtonLink>

      <ButtonLink
        onClick={() => {
          firebase.auth().signOut().then(history.push("/"));
        }}
        type="secondary"
      >
        Log out
      </ButtonLink>
    </>
  );

  const renderNormal = (
    <>
      <ButtonLink
        onClick={() => {
          history.push("/login");
        }}
        type="secondary"
      >
        Log In
      </ButtonLink>
      <ButtonLink
        onClick={() => {
          history.push("/signup");
        }}
        type="secondary"
      >
        Sign Up
      </ButtonLink>
    </>
  );
  let render = null;
  if (status === "ADMIN") {
    render = renderAdmin;
  } else if (status === "CLIENT") {
    render = renderUser;
  } else {
    render = renderNormal;
  }
  return (
    <div>
      <NavigationBar dataTest="test">
        <Stack align="center" flex justify="between" spacing="none">
          <LinkList direction="row">
            <TextLink type="secondary">Home</TextLink>
            {status === "CLIENT" && (
              <TextLink
                onClick={() => {
                  history.push("/booking");
                }}
                type="secondary"
              >
                Make a booking
              </TextLink>
            )}
            <TextLink type="secondary">Our Staff</TextLink>
            <TextLink type="secondary">Products</TextLink>
          </LinkList>
          <Stack direction="row" justify="end" shrink spacing="tight">
            {render}
          </Stack>
        </Stack>
      </NavigationBar>
    </div>
  );
};

export default Nav;
