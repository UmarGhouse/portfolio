import React from "react";
import Routes from "../routes/Index";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./Blocks";
import { ScrollToTop } from '../components/Utilities'

export default props => (
  <Router>
    <ScrollToTop />
    <NavBar {...props} />

    {Routes}
  </Router>
);