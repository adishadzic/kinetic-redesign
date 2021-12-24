import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Sidebar from "./components/Sidebar";
import Clients from "./components/Clients";
// import PacmanLoader from "react-spinners/PacmanLoader";
// import { css } from "@emotion/react";

// const override = css`
//   background-color: transparent;
// `;

const App = () => {
  return (
    <>
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
    </>
  );
};

// const Loading = () => {
//   return (
//     <div
//       className="Loading"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         marginTop: 380,
//       }}
//     >
//       <PacmanLoader css={override} color="#4FC2BE" size={30} />
//     </div>
//   );
// };

export default App;
