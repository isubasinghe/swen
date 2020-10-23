import React, { useState, useLayoutEffect } from "react";
import Table from "@kiwicom/orbit-components/lib/Table";
import TableHead from "@kiwicom/orbit-components/lib/Table/TableHead";
import TableCell from "@kiwicom/orbit-components/lib/Table/TableCell";
import TableRow from "@kiwicom/orbit-components/lib/Table/TableRow";
import TableBody from "@kiwicom/orbit-components/lib/Table/TableBody";
import TableFooter from "@kiwicom/orbit-components/lib/Table/TableFooter";

import { format } from "date-fns";
import * as firebase from "firebase";

const Admin = () => {
  const db = firebase.firestore();
  const [bookings, setBookings] = useState([]);
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
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default Admin;
