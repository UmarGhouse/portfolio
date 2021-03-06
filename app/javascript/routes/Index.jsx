import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/StaticPages/Home";
import About from "../components/StaticPages/About"
import Login from "../components/StaticPages/Login"
import Projects from "../components/Projects/Projects"
import Project from "../components/Projects/Project"
import NewProject from "../components/Projects/NewProject"
import EditProject from "../components/Projects/EditProject"

export default (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/about" exact component={About} />
        <Route path="/projects" exact component={Projects} />
        <Route path="/project/:id" exact component={Project} />
        <Route path="/project" exact component={NewProject} />
        <Route path="/project/:id/edit" exact component={EditProject} />
    </Switch>
);