import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../assets/styles/Dashboard.css";
import calendar from "../assets/images/calendar.png";
import newReservation from "../assets/images/new_reservation.png";
import clients from "../assets/images/clients.png";
import finances from "../assets/images/finances.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EuroIcon from "@mui/icons-material/Euro";

let services = [
  {
    title: "Usluga 1",
    duration: "30min",
    price: "20.00",
  },
  {
    title: "Usluga 2",
    duration: "20min",
    price: "20.00",
  },
  {
    title: "Usluga 3",
    duration: "40min",
    price: "40.00",
  },
  {
    title: "Usluga 4",
    duration: "60min",
    price: "50.00",
  },
];

export default function Dashboard() {
  return (
    <div className="main">
      <Box sx={{ flexGrow: 1, paddingTop: 8 }}>
        <Grid container rowSpacing={5} columnSpacing={5}>
          <Grid item xs={6} md={4}>
            <Paper
              sx={{
                width: 450,
                height: 140,
                backgroundColor: "#fff",
                borderRadius: 4,
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.35s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: " #fff",
                  cursor: "pointer",
                },
              }}
            >
              <h4 className="dash_title">Kalendar</h4>
              <img
                className="dash_image_long"
                src={calendar}
                alt=""
                height="70"
              />
            </Paper>
          </Grid>
          <Grid item xs={6} md={8}>
            <Paper
              sx={{
                width: 269,
                height: 140,
                backgroundColor: "#fff",
                borderRadius: 4,
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.35s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: " #fff",
                  cursor: "pointer",
                },
              }}
            >
              <h4 className="dash_title_alt">Nova rezervacija</h4>
              <img
                className="dash_image"
                src={newReservation}
                alt=""
                height="70"
              />
            </Paper>
          </Grid>
          <Grid item md={2.7}>
            <Paper
              sx={{
                width: 260,
                height: 140,
                backgroundColor: "#fff",
                borderRadius: 4,
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.35s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: " #fff",
                  cursor: "pointer",
                },
              }}
            >
              <h4 className="dash_title_alt">Financije</h4>
              <div className="image_wrapper">
                <img
                  className="dash_image_finances"
                  src={finances}
                  alt=""
                  height="60"
                />
              </div>
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              sx={{
                width: 450,
                height: 140,
                backgroundColor: "#fff",
                borderRadius: 4,
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.35s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: " #fff",
                  cursor: "pointer",
                },
              }}
            >
              <h4 className="dash_title">Klijenti</h4>
              <div className="flexbox">
                <span className="clients_no">250</span>
                <img
                  className="dash_image_long_clients"
                  src={clients}
                  height="55"
                  alt=""
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} md={12}>
            <Paper
              sx={{
                width: 450,
                height: 500,
                backgroundColor: "#fff",
                borderRadius: 4,
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.35s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: " #fff",
                  cursor: "pointer",
                },
              }}
            >
              <h4 className="dash_title">Usluge</h4>
              <div className="services_table_header">
                <p className="services_table_header_title">Usluga</p>
                <AccessTimeIcon />
                <EuroIcon />
              </div>
              {services.map((service) => {
                return (
                  <div className="services_table_body">
                    <p className="services_table_body_title">{service.title}</p>
                    <span>{service.duration}</span>
                    <span>{service.price}</span>
                  </div>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
