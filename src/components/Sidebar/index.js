import React, { useEffect, useState } from "react";
import * as Icons from "@mui/icons-material";
import { sidebarData } from "./sidebarData";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo1 from "../../assets/images/logo1.png";
import Backdrop from "@mui/material/Backdrop";
import "./styles.css";
import { useHistory } from "react-router";

const StyledMenu = styled((props) => (
  <Menu
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "rgba(48, 62, 72, 0.95)",
    overflowY: "hidden",
    marginTop: theme.spacing(2),
    minWidth: 200,
    "& .MuiMenuItem-root": {
      margin: "0.6rem",
      color: "rgb(79, 194, 190)",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: "600",
      fontSize: "1.2rem",
      transition: "0.4s",
      borderRadius: "5px",
      "& .MuiSvgIcon-root": {
        fontSize: 30,
        marginRight: theme.spacing(1.5),
      },
      "&:hover": {
        color: "#000",
        backgroundColor: "rgb(79, 194, 190)",
        transform: "scale(1.05)",
      },
    },
  },
}));

export default function Sidebar() {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => setSidebar(!sidebar);

  const [date, setDate] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  let time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const [backdropOpen, setBackdropOpen] = useState(false);

  const handleCloseBackdrop = () => {
    setSidebar(false);
    setBackdropOpen(false);
  };
  const handleToggleBackdrop = () => {
    setSidebar(!sidebar);
    setBackdropOpen(!open);
  };

  const weekday = new Array(7);
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  weekday[0] = "Sunday";

  let today = weekday[date.getUTCDay()];

  return (
    <>
      <header className="header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="#" className="menu-bars">
            <Icons.Menu onClick={handleToggleBackdrop} />
          </Link>
          <img
            src={logo1}
            alt=""
            style={{ marginLeft: "1rem", height: "5rem", cursor: "pointer" }}
            onClick={() => {
              history.push("/");
            }}
          />
        </div>

        <div>
          <div className="time_date">
            <p className="time">{time}</p>
            <p className="date">
              {today} <br />{" "}
              {date.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flexbox_class">
          <Icons.AccountCircle
            style={{
              fontSize: 50,
              color: "#6edbd6",
            }}
          />
          <Icons.KeyboardArrowDown
            style={{ cursor: "pointer" }}
            id="demo-customized-button"
            aria-controls="demo-customized-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableelevation="true"
            onClick={handleClick}
            endicon={<KeyboardArrowDownIcon />}
          />
        </div>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Icons.AccountBox />
            My profile
          </MenuItem>
          <Divider
            style={{
              backgroundColor: "rgba(255,255,255, 0.5)",
              margin: "0px 10px",
            }}
          />
          <MenuItem onClick={handleClose}>
            <Icons.ExitToApp />
            Logout
          </MenuItem>
        </StyledMenu>
      </header>

      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(5px)",
        }}
        open={backdropOpen}
        onClick={handleCloseBackdrop}
      >
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={toggleSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars-close">
                <Icons.Close sx={{ fontSize: "3rem" }} />
              </Link>
            </li>
            {sidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="menu_item">{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text">
              <Link to="#">
                <Icons.ExitToApp />
                <span className="menu_item">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </Backdrop>
    </>
  );
}
