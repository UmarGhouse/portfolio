import React from "react";
import Routes from "../routes/Index";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./Blocks";

export default props => (
  <Router>
    <NavBar />

    {Routes}
  </Router>
);