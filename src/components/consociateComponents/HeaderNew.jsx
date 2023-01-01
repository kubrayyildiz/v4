import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Navbar, Nav } from "react-bootstrap";
import { BsJoystick } from "react-icons/bs";
import { TbHandStop } from "react-icons/tb";
import { GiBattery100 as B100 } from "react-icons/gi";
import { GiBattery75 as B75 } from "react-icons/gi";
import { GiBattery50 as B50 } from "react-icons/gi";
import { GiBattery25 as B25 } from "react-icons/gi";
import { GiBattery0 as B0 } from "react-icons/gi";
import { GiBatteryPack as Bch } from "react-icons/gi";
import axios from "axios";

import "./Header.css";
const Header = (props) => {
  const [icon, setIcon] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState([]);
  function getBatteryLevel(){

    let intervalID = setInterval(() => {
    axios
    .get("http://192.168.109.142:5050/api/v1/ros/battery")
    .then((res) => {
      setBatteryLevel(res.data);
      if (batteryLevel.Battery === 100) {
        setIcon(B100);
      } else if (batteryLevel.Battery > 80) {
        setIcon(Bch);
      } else if (batteryLevel.Battery > 75) {
        setIcon(B75);
      } else if (batteryLevel.Battery > 50) {
        setIcon(B50);
      } else if (batteryLevel.Battery > 25) {
        setIcon(B25);
      } else {
        setIcon(B0);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, 3000);

  }
  useEffect(() => {
      getBatteryLevel();

  }, []);
  return (
    <Navbar
      bg="dark"
      expand="sm"
      collapseOnSelect
      variant="dark"
      style={{ height: "60px" }}>
      <Navbar.Brand href="/" id="epik">
        EPIK ROBOTIK
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          <Button id="joystick">
            <BsJoystick
              id="joystickicon"
              size={30}
              color="#6CB4EE"
            ></BsJoystick>
          </Button>
          <Button id="stop1">
            <Button id="stop">
              <TbHandStop size={30}></TbHandStop>
            </Button>{" "}
          </Button>
          <button id="misson" disabled>
            Current Mission
          </button>
          <h5 style={{ fontSize: "25px " }} id="batteryLevelIcon">
            {icon}
          </h5>
          <h5  id="batteryLevel">{batteryLevel.Battery}</h5>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
