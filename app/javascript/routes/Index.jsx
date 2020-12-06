import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/StaticPages/Home";
import Projects from "../components/Projects/Projects"
import Project from "../components/Projects/Project"
import NewProject from "../components/Projects/NewProject"

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/project/:id" exact component={Project} />
            <Route path="/project" exact component={NewProject} />
        </Switch>
    </Router>
);