import axios from "axios";
require("dotenv").config();

let Connect = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const Client = {
  async getAllClients() {
    let response = await Connect.get("/clients");
    return response.data;
  },
};

export default Client;
