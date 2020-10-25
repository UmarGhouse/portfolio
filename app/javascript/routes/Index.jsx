import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/StaticPages/Home";
import Projects from "../components/Projects/Projects"

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/projects" exact component={Projects} />
        </Switch>
    </Router>
);