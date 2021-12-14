import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import rows from "./rows";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.css";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import HashLoader from "react-spinners/HashLoader";

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

  useEffect(() => {
    setLoading(true);
    setInterval(() => {
      setClients(rows);
      setLoading(false);
    }, 1200);
    // eslint-disable-next-line
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
          <h5 style={{ marginRight: "2rem" }}>Clients</h5>
          <div className="searchInput">
            <SearchIcon sx={{ fontSize: "2rem" }} />
            <input placeholder="Find a client..."></input>
          </div>
          <div className="add_button">
            <PersonAddAltIcon />
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
                          <TableCell style={{ textAlign: "center" }}>
                            <Tooltip title="Edit" placement="left">
                              <EditIcon />
                            </Tooltip>
                            <Tooltip title="Delete" placement="right">
                              <DeleteOutlineIcon />
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
