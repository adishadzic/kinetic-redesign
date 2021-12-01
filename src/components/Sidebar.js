import React, { useState } from "react";
import * as Icons from "@mui/icons-material";
import { sidebarData } from "./sidebarData";
import { Link } from "react-router-dom";
import moment from "moment";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "../assets/styles/Sidebar.css";
import logo from "../assets/images/logo.png";
import logo1 from "../assets/images/logo1.png";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
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
    borderRadius: 6,
    marginTop: theme.spacing(3),
    minWidth: 230,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function Sidebar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="#" className="menu-bars">
            <Icons.Menu onClick={toggleSidebar} />
          </Link>
          <img
            src={logo1}
            alt=""
            style={{ marginLeft: "1rem", height: "5rem" }}
          />
        </div>

        <div>
          <div className="time_date">
            <p className="time">{moment().format("h:mm")}</p>
            <p className="date">
              {moment().format("dddd")} <br /> {moment().format("LL")}
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
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          />
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "600",
                }}
              >
                Hello, John <Icons.EmojiPeople sx={{ fontSize: "1.5rem" }} />
              </p>
            </div>
            <MenuItem onClick={handleClose} disableRipple>
              <Icons.AccountBox />
              My profile
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
              <Icons.Logout />
              Logout
            </MenuItem>
          </StyledMenu>
        </div>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={toggleSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars-close">
              <Icons.Close sx={{ fontSize: "1.5rem" }} />
            </Link>
            <img src={logo} height="80" alt="" />
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
            <Link>
              <Icons.ExitToApp />
              <span className="menu_item">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
