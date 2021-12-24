import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Sidebar from "./components/Sidebar";
import Clients from "./components/Clients";
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/react";

const override = css`
  background-color: transparent;
`;

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

const Loading = () => {
  return (
    <div
      className="Loading"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 390,
      }}
    >
      <PacmanLoader css={override} color="#4FC2BE" size={30} />
    </div>
  );
};

export default App;
