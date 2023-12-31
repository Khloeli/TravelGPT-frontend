import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import FlightIcon from "@mui/icons-material/Flight";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Navbar({ value, setValue, isAuthenticated }) {
  const navigate = useNavigate();

  const handleIconClick = () => {
    isAuthenticated ? setValue(`upcoming`) : setValue(`explore`);
    navigate(`/`);
  };

  const handleClick = () => {
    setValue(null);
    navigate(`/credits`);
  };

  const handleProfileClick = () => {
    setValue(null);
    navigate(`/profile`);
  };

  return (
    <AppBar
      position="static"
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: value ? null : "whitesmoke",
          }}
          onClick={handleIconClick}
        >
          <div style={{ marginRight: "10px" }}>TravelGPT</div>
          <FlightIcon />
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={handleProfileClick}
          >
            <AccountCircle />
          </div>
          <div style={{ cursor: "pointer" }} onClick={handleClick}>
            <MenuIcon />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
