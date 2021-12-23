import * as React from "react";
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
import MenuItem from "@mui/material/MenuItem";
import "./styles.css";

const currentDate = new Date();

const appointments = [
  {
    startDate: "2021-12-12T08:00",
    endDate: "2021-12-12T09:45",
    title: "Meeting",
  },
  {
    startDate: "2021-12-12T10:45",
    endDate: "2021-12-12T11:35",
    title: "Training",
  },
  {
    startDate: "2021-12-13T08:00",
    endDate: "2021-12-13T09:45",
    title: "Meeting",
  },
  {
    startDate: "2021-12-14T10:45",
    endDate: "2021-12-14T11:35",
    title: "Training",
  },
  {
    startDate: "2021-12-15T08:00",
    endDate: "2021-12-15T09:45",
    title: "Meeting",
  },
  {
    startDate: "2021-12-17T10:45",
    endDate: "2021-12-17T11:35",
    title: "Training",
  },
];

const currencies = [
  {
    value: "30",
    label: "30 minutes",
  },
  {
    value: "60",
    label: "60 minutes",
  },
  {
    value: "120",
    label: "2 hours",
  },
];

const clients = [
  {
    value: "1",
    label: "John Doe",
  },
  {
    value: "2",
    label: "Abraham Lincoln",
  },
  {
    value: "3",
    label: "Muhammed Ali",
  },
];

export default function Calendar() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Scheduler data={appointments}>
            <ViewState currentDate={currentDate} />
            <WeekView startDayHour={8} endDayHour={17} excludedDays={[0, 6]} />
            <Appointments />
          </Scheduler>
        </Paper>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        style={{ height: "630px", marginTop: 110 }}
      >
        <DialogTitle>Add new appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the form below to add a new appointment.
          </DialogContentText>
          <br />
          <p>Insert appointment title</p>
          <TextField variant="outlined" />
          <br />
          <br />
          <p>Pick date and time</p>
          <TextField
            id="datetime-local"
            type="datetime-local"
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <p>Select duration</p>
          <TextField select sx={{ width: 250 }}>
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <br />
          <p>Select client</p>
          <TextField select sx={{ width: 250 }}>
            {clients.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
