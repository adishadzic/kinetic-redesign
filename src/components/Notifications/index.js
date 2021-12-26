import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const addSuccess = () =>
  toast.success("Client successfully added! 👌", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const deleteSuccess = () =>
  toast.success("Client successfully deleted! 👋", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const errorNotification = () =>
  toast.error("Error occured 🤯", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const apptRangeError = () =>
  toast.error("Timeslot you entered is already booked 😕", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const newAppointmentSuccess = () =>
  toast.success("Appointment successfully added! 👌", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export {
  addSuccess,
  deleteSuccess,
  errorNotification,
  newAppointmentSuccess,
  apptRangeError,
};
