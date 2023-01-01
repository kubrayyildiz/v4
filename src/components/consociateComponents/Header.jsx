import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { Navbar, Nav } from "react-bootstrap";
import * as ROSLIB from "roslib";
import "./headerCss.css";
import { BsJoystick } from "react-icons/bs";
import { TbHandStop } from "react-icons/tb";
import { GiBattery100 as B100 } from "react-icons/gi";
import { GiBattery75 as B75 } from "react-icons/gi";
import { GiBattery50 as B50 } from "react-icons/gi";
import { GiBattery25 as B25 } from "react-icons/gi";
import { GiBattery0 as B0 } from "react-icons/gi";
import { GiBatteryPack as Bch } from "react-icons/gi";
import ManualJoystick from "./ManualJoystick";
import { RosContext } from "../../contexts/RosContext";
import axios from "axios";

const TestHeader = () => {
  const { ros } = useContext(RosContext);
  const [showJoystick, setshowJoystick] = useState(false);
  const [icon, setIcon] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState([]);
  function getBatteryLevel() {
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
  // const [icon, setIcon] = useState(null);
  // useEffect(() => {
  //   var robot = new ROSLIB.Topic({
  //     ros: ros,
  //     name: "/robot_state",
  //     messageType: "robot/RobotState",
  //   });
  //   robot.subscribe((message) => {
  //     if (message.battery_percentege === 100) {
  //       setIcon(B100);
  //     } else if (message.battery_percentege > 80) {
  //       setIcon(Bch);
  //     } else if (message.battery_percentege > 75) {
  //       setIcon(B75);
  //     } else if (message.battery_percentege > 50) {
  //       setIcon(B50);
  //     } else if (message.battery_percentege > 25) {
  //       setIcon(B25);
  //     } else {
  //       setIcon(B0);
  //     }
  //   });
  // }, [ros]);
  return (
    <div className="headercontainer">
      <Navbar
        ros={ros}
        style={{ height: "55px" }}
        bg="dark"
        expand="lg"
        collapseOnSelect
        variant="dark"
      >
        <Navbar.Brand href="/" id="epik">
          EPIK ROBOTIK &copy;
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse>
          <Nav className="ms-auto" style={{ height: "50px" }}>
            <Button
              id="joystick"
              onClick={() => {
                setshowJoystick(!showJoystick);
              }}
            >
              <BsJoystick
                id="joystickicon"
                size={30}
                color="#2c7caa"
              ></BsJoystick>
              {showJoystick && (
                <div className="konusma-balonu">
                  <ManualJoystick />
                </div>
              )}
            </Button>
            <Button id="stop1">
              <Button id="stop">
                <TbHandStop size={30}></TbHandStop>
              </Button>{" "}
            </Button>
            <Button id="robot1">
              <Button
                id="robot"
                className="rounded-pill"
                variant={ros.isConnected ? "success" : "danger"}
                disabled
              >
                {ros.isConnected ? "Robot Connected" : "Robot Disconnected"}
              </Button>{" "}
            </Button>

            <button id="misson" disabled>
              Current Mission
            </button>
            <h5 style={{ fontSize: "30px " }} id="batterylevel">
              {icon}
            </h5>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default TestHeader;
