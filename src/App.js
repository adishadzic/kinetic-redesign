import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import Calendar from "./views/Calendar";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/calendar" component={Calendar} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
