import React from "react";
import "../assets/styles/Login.css";
import logo from "../assets/images/logo.png";
import physical_image from "../assets/images/physical2x.png";

function Login() {
  return (
    <div className="main">
      <div class="login_body">
        <div class="flex_row">
          <div class="flex_column">
            <img
              class="physical_image"
              src={physical_image}
              alt="Physical imagee"
            />
          </div>
          <div class="flex_column">
            <form>
              <div class="login_form">
                <img class="logo" src={logo} alt="Logo"></img>
                <div class="break"></div>
                <div class="h1_login">
                  <h1>Kinetic centar</h1>
                </div>
                <div class="break"></div>
                <div class="dobrodosli">
                  <h2>Dobrodošli natrag! Molimo prijavite se na račun.</h2>
                </div>
                <div class="break"></div>
                <input id="email" type="email" placeholder="e-mail"></input>
                <div class="break"></div>
                <input
                  id="password"
                  type="password"
                  placeholder="zaporka"
                ></input>
                <div class="break"></div>
                <button class="prijava">
                  <p>Prijava</p>
                </button>
                <div class="break"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
