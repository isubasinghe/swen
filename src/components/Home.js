import React from "react";
import PictureCard from "@kiwicom/orbit-components/lib/PictureCard";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Text from "@kiwicom/orbit-components/lib/Text";
import styled from "styled-components";
import CoverImage from "../assets/cover.jpg";
import Cover1Image from "../assets/cover1.jpg";

const Container = styled.div`
  margin: 0 auto;
  max-width: 50rem;
  margin-bottom: 20px;
  text-align: center;
`;
const Home = ({ history, location }) => {
  return (
    <>
      <Container>
        <Heading as="h1" type="display">
          Beth's hairdressing
        </Heading>
      </Container>
      <img
        style={{
          maxHeight: 600,
          width: "100%",
          objectFit: "cover",
        }}
        src={Cover1Image}
        alt="young boy getting his hair cut"
      />
      <div style={{ margin: 20 }}>
        <Container>
          <div style={{ margin: 20 }}>
            <Heading>About Us</Heading>
          </div>
          <Text size="large">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            feugiat, ante nec venenatis sagittis, sem massa semper leo, vel
            mattis magna nisi ut turpis. Sed ac molestie lacus, eu volutpat
            justo. Quisque purus diam, varius et diam non, pharetra vestibulum
            diam. Phasellus ultrices ante et odio luctus pulvinar. Nullam tellus
            justo, pharetra nec leo et, mollis commodo justo. In ullamcorper
            convallis arcu, non sollicitudin urna. Proin at fringilla sem, id
            tempor felis. Nullam nec congue lacus. Suspendisse sit amet auctor
            libero. Pellentesque sed sapien lectus. Donec a nulla nec quam
            mattis pulvinar. Suspendisse porttitor tortor ante, sed semper neque
            gravida venenatis. Cras scelerisque id mi vitae euismod. Aliquam
            vehicula viverra fringilla. Vestibulum id erat at lectus rhoncus
            imperdiet et non elit. Praesent tempor vehicula nunc, et iaculis
            nibh. Quisque cursus sit amet nulla nec fringilla. Phasellus
            ultricies nec nisl et mattis. Cras accumsan dictum dui et bibendum.
            Morbi ullamcorper malesuada ipsum.
          </Text>
        </Container>
      </div>
      <PictureCard
        title="Book us now"
        actions={<Text type="white">Best Value Around</Text>}
        image={{ name: "cover", src: CoverImage }}
        onClick={() => {
          history.push("/booking");
        }}
      ></PictureCard>
      <div style={{ margin: 20 }}>
        <Container>
          <div style={{ margin: 20 }}>
            <Heading>Our unique approach during the ongoing pandemic</Heading>
          </div>
          <Text size="large">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            feugiat, ante nec venenatis sagittis, sem massa semper leo, vel
            mattis magna nisi ut turpis. Sed ac molestie lacus, eu volutpat
            justo. Quisque purus diam, varius et diam non, pharetra vestibulum
            diam. Phasellus ultrices ante et odio luctus pulvinar. Nullam tellus
            justo, pharetra nec leo et, mollis commodo justo. In ullamcorper
            convallis arcu, non sollicitudin urna. Proin at fringilla sem, id
            tempor felis. Nullam nec congue lacus. Suspendisse sit amet auctor
            libero. Pellentesque sed sapien lectus. Donec a nulla nec quam
            mattis pulvinar. Suspendisse porttitor tortor ante, sed semper neque
            gravida venenatis. Cras scelerisque id mi vitae euismod. Aliquam
            vehicula viverra fringilla. Vestibulum id erat at lectus rhoncus
            imperdiet et non elit. Praesent tempor vehicula nunc, et iaculis
            nibh. Quisque cursus sit amet nulla nec fringilla. Phasellus
            ultricies nec nisl et mattis. Cras accumsan dictum dui et bibendum.
            Morbi ullamcorper malesuada ipsum.
          </Text>
        </Container>
      </div>
    </>
  );
};

export default Home;
