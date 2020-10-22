import React, { useLayoutEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Booking from "./components/Booking";
import * as firebase from "firebase";

function App() {
  const normalRoutes = (
    <>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </>
  );

  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const adminRoutes = <></>;
  const userRoutes = (
    <>
      <Route path="/booking" component={Booking} />
    </>
  );
  let routes = null;
  let status = "";
  if (user === null) {
    routes = normalRoutes;
  } else if (user.uid === "IK5TRvSZ7vSdDgY3ojGZq3dpV1F3") {
    routes = adminRoutes;
    status = "ADMIN";
  } else {
    routes = userRoutes;
    status = "CLIENT";
  }
  console.log(firebase.auth().currentUser);
  return (
    <div>
      <Router>
        <Nav status={status} />
        <div style={{ marginTop: 100 }}>{routes}</div>
      </Router>
    </div>
  );
}

export default App;
