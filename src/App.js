import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Sidebar from "./components/Sidebar";
// import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
