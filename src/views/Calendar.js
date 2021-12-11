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

const currentDate = new Date();

const appointments = [
  {
    startDate: "2021-12-10T08:00",
    endDate: "2021-12-10T09:45",
    title: "Meeting",
  },
  {
    startDate: "2021-12-10T10:45",
    endDate: "2021-12-10T11:35",
    title: "Training",
  },
  {
    startDate: "2021-12-07T08:00",
    endDate: "2021-12-07T09:45",
    title: "Meeting",
  },
  {
    startDate: "2021-12-14T10:45",
    endDate: "2021-12-14T11:35",
    title: "Training",
  },
  {
    startDate: "2021-12-15T08:00",
    endDate: "2021-12-015T09:45",
    title: "Meeting",
  },
  {
    startDate: "2021-12-09T10:45",
    endDate: "2021-12-09T11:35",
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
            justifyContent: "space-between",
          }}
        >
          <h5>Reservations - week view</h5>
          <Button
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: 240,
              backgroundColor: "rgba(48, 62, 72, 0.7)",
              borderRadius: "1rem",
              boxShadow: "0 5px 15px rgb(0 0 0 / 10%)",
              transition: "all 0.2s ease-in-out",
              fontSize: "1.5rem",
              fontFamily: "Montserrat, sans-serif",
              color: "rgb(79, 194, 190)",
              "&:hover": {
                backgroundColor: "rgba(48, 62, 72, 0.85)",
                cursor: "pointer",
              },
            }}
            onClick={handleClickOpen}
          >
            <AddIcon sx={{ fontSize: 35 }} />
            <p>Add new</p>
          </Button>
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

      <Dialog open={open} onClose={handleClose}>
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
