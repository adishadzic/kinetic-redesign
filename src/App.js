import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Sidebar from "./components/Sidebar";
import Clients from "./components/Clients";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/clients" component={Clients} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
