import React, { useState, useLayoutEffect } from "react";
import Table from "@kiwicom/orbit-components/lib/Table";
import TableHead from "@kiwicom/orbit-components/lib/Table/TableHead";
import TableCell from "@kiwicom/orbit-components/lib/Table/TableCell";
import TableRow from "@kiwicom/orbit-components/lib/Table/TableRow";
import TableBody from "@kiwicom/orbit-components/lib/Table/TableBody";
import Card from "@kiwicom/orbit-components/lib/Card";
import CardSection from "@kiwicom/orbit-components/lib/Card/CardSection";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Layout from "@kiwicom/orbit-components/lib/Layout";
import LayoutColumn from "@kiwicom/orbit-components/lib/Layout/LayoutColumn";
import Button from "@kiwicom/orbit-components/lib/Button";
import CheckBox from "@kiwicom/orbit-components/lib/Checkbox";

import { format } from "date-fns";
import * as firebase from "firebase";

const Admin = () => {
  const db = firebase.firestore();
  const [bookings, setBookings] = useState([]);
  const [hairCut, setHairCut] = useState({ enabled: false, price: 0 });
  const [wash, setWash] = useState({ enabled: false, price: 0 });
  const [colour, setColour] = useState({ enabled: false, price: 0 });

  const mapper = {
    "Hair Cut": setHairCut,
    "Hair Wash & Dry": setWash,
    "Hair Colour": setColour,
  };
  useLayoutEffect(() => {
    db.collection("bookings")
      .get()
      .then((data) => {
        return Promise.all(
          data.docs.map((doc) => {
            const newData = doc.data();
            return newData.user.get().then((value) => {
              const { name: userName, ...rest } = value.data();

              return Object.assign(rest, { userName }, doc.data());
            });
          })
        );
      })
      .then((data) => {
        setBookings(data);
      });

    db.collection("services")
      .get()
      .then((services) => {
        services.docs.forEach((doc) => {
          const newData = doc.data();
          const setter = mapper[newData.name];
          setter({ enabled: newData.enabled, price: newData.price });
        });
      });
  }, []);

  const idMapper = {
    HC: "FNG4MS4zV3V4S2jbodqe",
    HW: "FNG4MS4zV3V4S2jbodqe",
    C: "FNG4MS4zV3V4S2jbodqe",
  };

  const valuesMapper = { HC: hairCut, HW: wash, C: colour };

  const save = (field) => {
    db.collection("services")
      .doc(idMapper[field])
      .update({
        price: valuesMapper[field].price,
        enabled: valuesMapper[field].enabled,
      })
      .then((val) => {
        alert("Saved value");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout type="Booking">
      <LayoutColumn>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell as="th" scope="col">
                Name
              </TableCell>
              <TableCell as="th" scope="col">
                Phone Number
              </TableCell>
              <TableCell as="th" scope="col">
                Address
              </TableCell>
              <TableCell as="th" scope="col">
                Service
              </TableCell>
              <TableCell as="th" scope="col">
                Start Time
              </TableCell>
              <TableCell as="th" scope="col">
                End Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, i) => {
              const startDate = format(booking.start.toDate(), "H:m dd/MM/yy");
              const endDate = format(booking.end.toDate(), "H:m dd/MM/yy");
              return (
                <TableRow key={i}>
                  <TableCell>{booking.userName}</TableCell>
                  <TableCell>{booking.phone}</TableCell>
                  <TableCell>{booking.address}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </LayoutColumn>
      <LayoutColumn>
        <Card>
          <CardSection>Hair Cut</CardSection>
          <CardSection>
            <InputField
              required
              label="Price"
              placeholder="Price"
              prefix="$"
              value={hairCut.price}
              onChange={(ev) => {
                setHairCut({
                  enabled: hairCut.enabled ?? true,
                  price: Number(ev.target.value),
                });
              }}
            />
          </CardSection>
          <CardSection>
            <CheckBox
              label="Enabled"
              checked={hairCut.enabled}
              onChange={() => {
                const { price } = hairCut;
                setHairCut({ enabled: !hairCut.enabled, price });
              }}
            ></CheckBox>
          </CardSection>
          <CardSection>
            <Button
              onClick={() => {
                save("HC");
              }}
            >
              Save
            </Button>
          </CardSection>
        </Card>
        <div style={{ marginTop: 20 }}>
          <Card>
            <CardSection>Hair Wash & Dry </CardSection>
            <CardSection>
              <InputField
                prefix="$"
                required
                label="Price"
                placeholder="Price"
                value={wash.price}
                onChange={(ev) => {
                  setWash({
                    enabled: wash.enabled ?? true,
                    price: Number(ev.target.value),
                  });
                }}
              />
            </CardSection>
            <CardSection>
              <CheckBox
                label="Enabled"
                onChange={() => {
                  const { price } = wash;
                  setWash({ enabled: !wash.enabled, price });
                }}
                checked={wash.enabled}
              ></CheckBox>
            </CardSection>
            <CardSection>
              <Button
                onClick={() => {
                  save("HW");
                }}
              >
                Save
              </Button>
            </CardSection>
          </Card>
        </div>
        <div style={{ marginTop: 20 }}>
          <Card>
            <CardSection>Hair Colour</CardSection>
            <CardSection>
              <InputField
                required
                prefix="$"
                label="Price"
                placeholder="Price"
                value={colour.price}
                onChange={(ev) => {
                  setColour({
                    enabled: colour.enabled,
                    price: Number(ev.target.value),
                  });
                }}
              />
            </CardSection>
            <CardSection>
              <CheckBox
                label="Enabled"
                onChange={() => {
                  const { price } = colour;
                  setColour({ enabled: !colour.enabled, price });
                }}
                checked={colour.enabled}
              ></CheckBox>
            </CardSection>
            <CardSection>
              <Button
                onClick={() => {
                  save("C");
                }}
              >
                Save
              </Button>
            </CardSection>
          </Card>
        </div>
      </LayoutColumn>
    </Layout>
  );
};

export default Admin;
