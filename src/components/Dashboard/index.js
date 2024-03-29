import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import calendar from "../../assets/images/calendar.png";
import newReservation from "../../assets/images/group.png";
import clients from "../../assets/images/clients.png";
import finances from "../../assets/images/finances.png";
import naplacivanje from "../../assets/images/naplacivanje.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EuroIcon from "@mui/icons-material/Euro";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { Client } from "../../api/index";
import "./styles.css";

let currentDate = new Date();
let hours = currentDate.getHours();

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
  height: 145,
  overflow: "hidden",
}));

const ItemBig = styled(Paper)(() => ({
  minHeight: 150,
  overflow: "hidden",
}));

export default function Dashboard() {
  let history = useHistory();

  const [clientsTotal, setClientsTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalClients = async () => {
    try {
      setLoading(true);
      let res = await Client.getAllClients();
      setClientsTotal(res.length);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    totalClients();
    return () => {
      setClientsTotal(null);
    };
  }, []);

  return (
    <div className="main">
      <Box sx={{ width: 0.4 }}>
        <h5>
          {hours < 12
            ? `Good morning, $[name]`
            : hours < 18
            ? `Good afternoon, $[name]`
            : `Good evening, $[name]`}
        </h5>
        <Box
          display="grid"
          gridTemplateColumns="repeat(8, 1fr)"
          gap={5}
          sx={{
            marginTop: "2rem",
          }}
        >
          <Box gridColumn="span 5">
            <Item
              sx={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: " #fff",
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                history.push("/calendar");
              }}
            >
              <h4 className="dash_title">Kalendar</h4>
              <div className="flexbox">
                <img src={calendar} alt="" height="60" />
              </div>
            </Item>
          </Box>
          <Box gridColumn="span 3">
            <Item
              sx={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: " #fff",
                  cursor: "pointer",
                },
              }}
            >
              <h4 className="dash_title">Nova rezervacija</h4>
              <div className="flexbox">
                <img
                  className="image"
                  src={newReservation}
                  alt=""
                  height="60"
                />
              </div>
            </Item>
          </Box>
          <Box gridColumn="span 3">
            <Item
              sx={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: " #fff",
                  cursor: "pointer",
                },
              }}
            >
              <h4 className="dash_title">Financije</h4>
              <div className="flexbox">
                <img src={finances} alt="" height="60" />
              </div>
            </Item>
          </Box>
          <Box gridColumn="span 5">
            <Item
              sx={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: " #fff",
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                history.push("/clients");
              }}
            >
              <h4 className="dash_title">Klijenti</h4>
              <div className="flexbox">
                <span className="clients_no">
                  {loading ? (
                    <CircularProgress sx={{ color: "#4FC2BE" }} />
                  ) : (
                    clientsTotal
                  )}
                </span>
                <img
                  className="dash_image_long_clients"
                  src={clients}
                  height="75"
                  alt=""
                />
              </div>
            </Item>
          </Box>
          <Box gridColumn="span 5">
            <ItemBig
              sx={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.3s ease-in-out",
                paddingBottom: 2,
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: "#fff",
                  cursor: "pointer",
                },
              }}
            >
              <h4 className="dash_title">Usluge</h4>
              <div className="services_table_header">
                <p className="services_table_header_title">Title</p>
                <AccessTimeIcon />
                <EuroIcon />
              </div>
              {services.map((service) => {
                return (
                  <div className="services_table_body" key={service.id}>
                    <p className="services_table_body_title">{service.title}</p>
                    <span>{service.duration}</span>
                    <span>{service.price}</span>
                  </div>
                );
              })}
              <p
                style={{
                  fontSize: "1rem",
                  marginLeft: "2.6rem",
                }}
              >
                Load more...
              </p>
            </ItemBig>
          </Box>
          <Box gridColumn="span 3">
            <Item
              sx={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: "#3f4142",
                  color: " #fff",
                  cursor: "pointer",
                },
              }}
            >
              <h4 className="dash_title">Naplaćivanje</h4>
              <div className="flexbox">
                <img src={naplacivanje} height="60" alt="" />
              </div>
            </Item>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "3rem" }}>
        <Paper
          style={{
            width: 460,
            height: 755,
            marginTop: "2.1rem",
            backgroundColor: "#fff",
            boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
            borderRadius: "1rem",
          }}
        >
          <Scheduler>
            <ViewState currentDate={currentDate} />
            <DayView startDayHour={8} endDayHour={17} excludedDays={[0, 6]} />
            <Appointments />
          </Scheduler>
        </Paper>
      </Box>
    </div>
  );
}
