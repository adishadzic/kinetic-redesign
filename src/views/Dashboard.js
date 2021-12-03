import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "../assets/styles/Dashboard.css";
import calendar from "../assets/images/calendar.png";
import newReservation from "../assets/images/new_reservation.png";
import clients from "../assets/images/clients.png";
import finances from "../assets/images/finances.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EuroIcon from "@mui/icons-material/Euro";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { styled } from "@mui/material/styles";

let currentDate = new Date();

const schedulerData = [
  {
    startDate: "2021-12-03T09:45",
    endDate: "2021-12-03T10:45",
    title: "Meeting",
  },
  {
    startDate: "2021-12-03T12:45",
    endDate: "2021-12-03T14:45",
    title: "Training",
  },
];

let services = [
  {
    id: 1,
    title: "Usluga 1",
    duration: "30min",
    price: "20.00",
  },
  {
    id: 2,
    title: "Usluga 2",
    duration: "20min",
    price: "20.00",
  },
  {
    id: 3,
    title: "Usluga 3",
    duration: "40min",
    price: "40.00",
  },
  {
    id: 4,
    title: "Usluga 4",
    duration: "60min",
    price: "50.00",
  },
];

const Item = styled(Paper)(() => ({
  height: 150,
  overflow: "hidden",
}));

const ItemBig = styled(Paper)(() => ({
  minHeight: 150,
  overflow: "hidden",
}));

export default function Dashboard() {
  return (
    <div className="main">
      <Box sx={{ width: 0.4, marginTop: "1rem" }}>
        <h4>Dashboard</h4>
        <Box
          display="grid"
          gridTemplateColumns="repeat(8, 1fr)"
          gap={5}
          sx={{ marginTop: "2rem" }}
        >
          <Box gridColumn="span 5">
            <Item
              sx={{
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
            </Item>
          </Box>
          <Box gridColumn="span 3">
            <Item
              sx={{
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
            </Item>
          </Box>
          <Box gridColumn="span 3">
            <Item
              sx={{
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
            </Item>
          </Box>
          <Box gridColumn="span 5">
            <Item
              sx={{
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
            </Item>
          </Box>
          <Box gridColumn="span 5">
            <ItemBig
              sx={{
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
            </ItemBig>
          </Box>
          <Box gridColumn="span 3">
            <Item
              sx={{
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
              <h4 className="dash_title">Naplacivanje</h4>
              <div className="flexbox">
                <img
                  className="dash_image_long_clients"
                  src={clients}
                  height="55"
                  alt=""
                />
              </div>
            </Item>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "1rem" }}>
        <h4>Calendar</h4>
        <Paper
          sx={{
            width: 400,
            height: 830,
            marginTop: "2.1rem",
            backgroundColor: "#fff",
            borderRadius: 4,
            boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
          }}
        >
          <Scheduler data={schedulerData}>
            <ViewState currentDate={currentDate} />
            <DayView startDayHour={8} endDayHour={17} excludedDays={[0, 6]} />
            <Appointments />
          </Scheduler>
        </Paper>
      </Box>
    </div>
  );
}
