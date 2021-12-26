import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, Select } from "@mui/material";
import { Client, Appointment, Service } from "../../api/index";
import {
  errorNotification,
  newAppointmentSuccess,
} from "../Notifications/index";
import moment from "moment";
import "./styles.css";

const currentDate = moment();

export default function Calendar() {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    error: false,
    errorMessage: {},
  });

  const getClients = async () => {
    try {
      let res = await Client.getAllClients();
      setClients(res.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const getServices = async () => {
    try {
      let res = await Service.getAllServices();
      setServices(res);
    } catch (error) {
      console.error(error);
    }
  };

  const getAppointments = async () => {
    try {
      let res = await Appointment.getAllAppointments();
      setAppointments(res);
    } catch (error) {
      console.error(error);
    }
  };

  const newArray = appointments.map((reservation) => {
    let startDateTimestamp = reservation.startDate;
    let formattedStartDate = moment.unix(startDateTimestamp).format();

    let endDateTimestamp = reservation.endDate;
    let formattedEndDate = moment.unix(endDateTimestamp).format();

    return {
      id: reservation.reservation_id,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      title: reservation.title,
    };
  });

  useEffect(() => {
    getClients();
    getServices();
    getAppointments();
    return () => {
      setClients([]);
      setServices([]);
      setAppointments([]);
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let isError = false;
    let currentDateUnix = moment(currentDate).unix();
    let startDateUnix = moment(formData.startdate).unix();
    let secs = formData.enddate * 60;
    let formatted = moment.utc(secs * 1000).format();
    let end_date = moment(formatted).unix();
    let endDateUnix = moment(startDateUnix) + end_date;

    if (startDateUnix <= currentDateUnix) {
      isError = true;
      setFormData({
        ...formData,
        error: true,
        errorMessage: { startDate: "Invalid timestamp" },
      });
    } else if (!isError) {
      setFormData({ ...formData, error: false, errorMessage: {} });
      delete formData.error;
      delete formData.errorMessage;

      formData.startdate = startDateUnix;
      formData.enddate = endDateUnix;

      let schedulerData = {
        startDate: formData.startdate,
        endDate: formData.enddate,
        title: formData.title,
        serviceID: formData.serviceId,
        clientID: formData.clientId,
      };

      console.log(schedulerData);
      Appointment.addNewAppointment(schedulerData);
      handleClose();
      newAppointmentSuccess();
      setTimeout(() => window.location.reload(), 1500);
    } else {
      errorNotification();
    }
  };

  return (
    <div className="main">
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h6 style={{ marginRight: 20 }}>Appointments for this week</h6>
          <div className="add_button" onClick={handleClickOpen}>
            <AddIcon style={{ color: "rgba(48, 62, 72, 1)", fontSize: 25 }} />
          </div>
        </div>
        <Paper
          sx={{
            width: 1400,
            height: 700,
            marginTop: "2.1rem",
            backgroundColor: "#fff",
            boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
            borderRadius: "1rem",
          }}
        >
          <Scheduler data={newArray}>
            <ViewState currentDate={currentDate} />
            <WeekView startDayHour={8} endDayHour={17} excludedDays={[0, 6]} />
            <Appointments />
          </Scheduler>
        </Paper>
      </div>

      <Dialog open={open}>
        <DialogTitle style={{ padding: "16px 0px 0px 23px" }}>
          Add new appointment
        </DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <DialogContentText>
              Fill out the form below to add a new appointment.
            </DialogContentText>
            <br />
            <TextField
              variant="filled"
              label="Appointment title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <br />
            <br />
            <TextField
              id="datetime-local"
              type="datetime-local"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              label="Date and time"
              onChange={(e) =>
                setFormData({ ...formData, startdate: e.target.value })
              }
              required
              error={
                formData.error && formData.errorMessage.startDate !== undefined
              }
              helperText={formData.errorMessage.startDate}
            />
            <br />
            <br />
            <FormControl variant="filled" required style={{ width: "47%" }}>
              <InputLabel htmlFor="serviceLine-native-required">
                Duration
              </InputLabel>
              <Select
                native
                name="appt_duration"
                onChange={(e) =>
                  setFormData({ ...formData, enddate: e.target.value })
                }
                required
              >
                <option aria-label="None" value="" />
                <option value={30}>30min</option>
                <option value={60}>1hr</option>
                <option value={90}>1.5hrs</option>
                <option value={120}>2hrs</option>
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl variant="filled" required style={{ width: "47%" }}>
              <InputLabel htmlFor="serviceLine-native-required">
                Client
              </InputLabel>
              <Select
                native
                name="appt_duration"
                onChange={(e) =>
                  setFormData({ ...formData, clientId: e.target.value })
                }
              >
                <option aria-label="None" value="" />
                {clients.map((row, index) => (
                  <option value={row.id} key={index}>
                    {row.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl variant="filled" required style={{ width: "60%" }}>
              <InputLabel htmlFor="serviceLine-native-required">
                Service
              </InputLabel>
              <Select
                native
                name="appt_duration"
                onChange={(e) =>
                  setFormData({ ...formData, serviceId: e.target.value })
                }
              >
                <option aria-label="None" value="" />
                {services.map((row, index) => (
                  <option value={row.service_id} key={index}>
                    {row.service_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "rgba(110, 219, 214, 1)",
                color: "rgba(48, 62, 72, 1)",
              }}
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
