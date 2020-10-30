import React, { useLayoutEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Booking from "./components/Booking";
import Account from "./components/Account";
import Admin from "./components/Admin";
import Home from "./components/Home";
import firebase from "firebase/app";

function App() {
  const normalRoutes = (
    <>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </>
  );

  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const adminRoutes = (
    <>
      <Route exact path="/admin" component={Admin} />
    </>
  );
  const userRoutes = (
    <>
      <Route exact path="/booking" component={Booking} />
      <Route exact path="/account" component={Account} />
    </>
  );
  let routes = null;
  let status = "";
  if (user === null) {
    routes = normalRoutes;
  } else if (user.uid === "MG3dWDDsjEeKvLddPLUAQyYJuKq2") {
    routes = adminRoutes;
    status = "ADMIN";
  } else {
    routes = userRoutes;
    status = "CLIENT";
  }
  return (
    <div>
      <Router>
        <Nav status={status} />
        <div style={{ marginTop: 100 }}>
          <Route exact path="/" component={Home} />
          {routes}
        </div>
      </Router>
    </div>
  );
}

export default App;
