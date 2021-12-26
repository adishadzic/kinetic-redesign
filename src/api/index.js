import axios from "axios";
import moment from "moment";
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
    let clientsArr = response.data;
    let formattedClientsArr = clientsArr.map((client) => {
      return {
        id: client.client_id,
        name: client.client_first_name + " " + client.client_last_name,
        number: client.client_phone_number,
        email: client.client_email,
        dob: moment(client.client_birth_date).format("MMMM Do YYYY"),
        sex: client.client_sex,
      };
    });
    return formattedClientsArr;
  },
  async addNewClient(client) {
    return Connect.post("/clients", client);
  },
  async removeClient(clientId) {
    await Connect.delete(`/clients/${clientId}`);
  },
};

const Appointment = {
  async addNewAppointment(appt) {
    return Connect.post("/reservations", appt);
  },
  async getAllAppointments() {
    let response = await Connect.get("/reservations");
    let appointmentsArr = response.data;
    let formattedApptsArr = appointmentsArr.map((appt) => {
      return {
        startDate: appt.startdate,
        endDate: appt.enddate,
        title: appt.title,
        serviceID: appt.serviceid,
        clientID: appt.clientid,
      };
    });
    return formattedApptsArr;
  },
};

const Service = {
  async getAllServices() {
    let response = await Connect.get("/services");
    return response.data;
  },
};

export { Client, Appointment, Service };
