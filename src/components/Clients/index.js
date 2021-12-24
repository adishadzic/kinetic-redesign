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
  MenuItem,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.css";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SearchIcon from "@mui/icons-material/Search";
import HashLoader from "react-spinners/HashLoader";
import Client from "../../api/index";
import moment from "moment";
import PhoneIcon from "@mui/icons-material/Phone";

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
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({});

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
      setClients(newArray);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    formattedClientsArray();
    // eslint-disable-next-line
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onSubmit = () => {};

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
            <SearchIcon sx={{ fontSize: "2rem" }} />
            <input placeholder="Find a client..."></input>
          </div>
          <div className="add_button" onClick={handleClickOpen}>
            <PersonAddAlt1Icon style={{ color: "rgba(48, 62, 72, 1)" }} />
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
                                style={{ textAlign: "center" }}
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
                              <EditIcon style={{ cursor: "pointer" }} />
                            </Tooltip>
                            <Tooltip title="Delete" placement="bottom">
                              <DeleteOutlineIcon
                                style={{ cursor: "pointer" }}
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
                                <PhoneIcon
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
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new client</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>
              Fill out the form below to add a new client.
            </DialogContentText>
            <br />
            <p>Insert client's first name</p>
            <TextField
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, client_first_name: e.target.value })
              }
              required
            />
            <br />
            <br />
            <p>Insert client's last name</p>
            <TextField
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, client_last_name: e.target.value })
              }
              required
            />
            <br />
            <br />
            <p>Insert client's email address</p>
            <TextField
              variant="outlined"
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, client_email: e.target.value })
              }
              required
            />
            <br />
            <br />
            <p>Insert client's phone number</p>
            <TextField
              variant="outlined"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  client_phone_number: e.target.value,
                })
              }
              required
            />
            <br />
            <br />
            <p>Insert client's date of birth</p>
            <TextField
              id="date"
              type="date"
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
            <p>Select client's sex</p>
            <TextField
              select
              sx={{ width: 250 }}
              onChange={(e) =>
                setFormData({ ...formData, client_sex: e.target.value })
              }
              required
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </TextField>
            <br />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
