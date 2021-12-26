import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  DeleteOutline,
  Phone,
  Edit,
  Search,
  PersonAddAlt1,
} from "@mui/icons-material";
import "./styles.css";
import HashLoader from "react-spinners/HashLoader";
import Client from "../../api/index";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDialog from "./ConfirmDialog";
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

const columns = [
  { id: "name", label: "NAME", width: 80 },
  { id: "number", label: "PHONE NUMBER", width: 90 },
  { id: "email", label: "E-MAIL", width: 90 },
  { id: "dob", label: "DATE OF BIRTH", width: 90 },
  { id: "sex", label: "SEX", width: 90 },
];

export default function Clients() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    error: false,
    errorMessage: {},
  });
  const [searchValue, setSearchValue] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
  });

  const formattedClientsArray = async () => {
    try {
      setLoading(true);
      let res = await Client.getAllClients();
      let newArray = res.map((client) => {
        return {
          id: client.client_id,
          name: client.client_first_name + " " + client.client_last_name,
          number: client.client_phone_number,
          email: client.client_email,
          dob: moment(client.client_birth_date).format("MMMM Do YYYY"),
          sex: client.client_sex,
        };
      });
      setClients(newArray.reverse());
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const searchData = (searchValue) => {
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchValue) ||
        client.name.includes(searchValue) ||
        client.email.includes(searchValue)
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (searchValue !== "") {
      let result = searchData(searchValue);
      setClients(result);
    } else {
      formattedClientsArray();
    }
    // eslint-disable-next-line
  }, [searchValue]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let isError = false;

    //eslint-disable-next-line
    const emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      formData.client_email
    );

    const phoneNumberIsValid =
      /^[0-9\b]+$/.test(formData.client_phone_number) &&
      !(formData.client_phone_number.length < 10) &&
      !(formData.client_phone_number.length >= 15);

    if (!emailIsValid) {
      isError = true;
      setFormData({
        ...formData,
        error: true,
        errorMessage: { email: "Invalid email" },
      });
    } else if (!phoneNumberIsValid) {
      isError = true;
      setFormData({
        ...formData,
        error: true,
        errorMessage: { phoneNumber: "Please enter a valid phone number" },
      });
    } else if (!isError) {
      setFormData({ ...formData, error: false, errorMessage: {} });
      let mutation = formData;
      delete mutation.error;
      delete mutation.errorMessage;

      Client.addNewClient(formData);
      handleClose();
      addSuccess();
      setTimeout(() => window.location.reload(), 1500);
    } else {
      errorNotification();
    }
  };

  const removeClient = async (clientId) => {
    try {
      setConfirmDialog({ ...confirmDialog, isOpen: false });
      Client.removeClient(clientId);
      deleteSuccess();
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      errorNotification();
    }
  };

  return (
    <div className="main">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 style={{ marginRight: "2rem" }}>Clients</h5>
          <div className="searchInput">
            <Search sx={{ fontSize: "2rem" }} />
            <input
              placeholder="Find a client..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
          </div>
          <div className="add_button" onClick={handleClickOpen}>
            <PersonAddAlt1 style={{ color: "rgba(48, 62, 72, 1)" }} />
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
          <TableContainer sx={{ maxHeight: 640, borderRadius: "1rem" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        backgroundColor: "rgba(48, 62, 72, 0.97)",
                        color: "rgb(79, 194, 190)",
                        textAlign: "center",
                      }}
                      width={column.width}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    style={{
                      width: 100,
                      backgroundColor: "rgba(48, 62, 72, 0.97)",
                      color: "rgb(79, 194, 190)",
                      textAlign: "center",
                    }}
                  >
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              {loading ? (
                <TableBody>
                  <TableRow style={{ height: 580 }}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="left">
                      <HashLoader color="#4FC2BE" size={80} />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {clients
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                style={{
                                  textAlign: "center",
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: 600,
                                }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                          <TableCell
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                              gap: 8,
                            }}
                          >
                            <Tooltip title="Edit" placement="left">
                              <Edit style={{ cursor: "pointer" }} />
                            </Tooltip>
                            <Tooltip title="Delete" placement="bottom">
                              <DeleteOutline
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setConfirmDialog({
                                    isOpen: true,
                                    user: `${row.name}`,
                                    onConfirm: () => removeClient(row.id),
                                  });
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Call" placement="right">
                              <a
                                href={`tel: row.number`}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Phone
                                  sx={{ color: "black", cursor: "pointer" }}
                                />
                              </a>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={clients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </div>
      <Dialog open={open}>
        <DialogTitle>Add new client</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <DialogContentText>
              Fill out the form below to add a new client.
            </DialogContentText>
            <br />
            <TextField
              variant="filled"
              label="First name"
              onChange={(e) =>
                setFormData({ ...formData, client_first_name: e.target.value })
              }
              required
            />
            <br />
            <br />
            <TextField
              variant="filled"
              label="Last name"
              onChange={(e) =>
                setFormData({ ...formData, client_last_name: e.target.value })
              }
              required
            />
            <br />
            <br />
            <TextField
              variant="filled"
              label="Email"
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, client_email: e.target.value })
              }
              required
              error={
                formData.error && formData.errorMessage.email !== undefined
              }
              helperText={formData.errorMessage.email}
            />
            <br />
            <br />
            <TextField
              variant="filled"
              label="Phone number"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  client_phone_number: e.target.value,
                })
              }
              required
              error={
                formData.error &&
                formData.errorMessage.phoneNumber !== undefined
              }
              helperText={formData.errorMessage.phoneNumber}
            />
            <br />
            <br />
            <TextField
              variant="filled"
              id="date"
              type="date"
              label="Date of birth"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setFormData({ ...formData, client_birth_date: e.target.value })
              }
              required
            />
            <br />
            <br />
            <FormControl variant="filled" required style={{ width: "47%" }}>
              <InputLabel htmlFor="serviceLine-native-required">Sex</InputLabel>
              <Select
                native
                name="client_sex"
                onChange={(e) =>
                  setFormData({ ...formData, client_sex: e.target.value })
                }
              >
                <option aria-label="None" value="" />
                <option value={"M"}>Male</option>
                <option value={"F"}>Female</option>
              </Select>
            </FormControl>
            <br />
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
