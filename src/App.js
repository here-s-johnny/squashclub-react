import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import Home from "./home";
import BookingBoard from "./bookingBoard";
import BookingPanel from "./bookingPanel";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/bookingBoard">
            <BookingBoard/>
          </Route>
          <Route path="/bookingPanel">
            <BookingPanel/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
