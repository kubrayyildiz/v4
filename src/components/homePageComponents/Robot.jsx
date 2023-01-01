// import * as ROSLIB from "roslib";
import React, { useState, useEffect, useContext } from "react";
import { GiBattery100 as B100 } from "react-icons/gi";
import { GiBattery75 as B75 } from "react-icons/gi";
import { GiBattery50 as B50 } from "react-icons/gi";
import { GiBattery25 as B25 } from "react-icons/gi";
import { GiBatteryPack as Bch } from "react-icons/gi";
import { GiBattery0 as B0 } from "react-icons/gi";
import { Container, Row, Col } from "react-bootstrap";
// import { RosContext } from "../../contexts/RosContext";
import robotCss from "./robotCss.module.css";
import axios from "axios";

const TestRobot = () => {
  // const { ros } = useContext(RosContext);
  const [icon, setIcon] = useState(null);
  const [data, setData] = useState([]);
  // console.log(data.battery_percentege);
  function getRobotState() {
    let intervalID = setInterval(() => {
      axios
        .get("http://192.168.109.142:5050/api/v1/ros/robotStatus")
        .then((res) => {
          setData(res.data.data);
          // console.log(res.data.data);
          // console.log(data.battery_percentege);
        })
        .catch((err) => {
          console.log(err);
        });

      if (data.battery_percentege === 100) {
        setIcon(B100);
      } else if (data.battery_percentege > 80) {
        setIcon(Bch);
      } else if (data.battery_percentege > 75) {
        setIcon(B75);
      } else if (data.battery_percentege > 50) {
        setIcon(B50);
      } else if (data.battery_percentege > 25) {
        setIcon(B25);
      } else {
        setIcon(B0);
      }
    }, 3000);
  }
  useEffect(() => {
    getRobotState();
  }, []);
  // const [icon, setIcon] = useState(null);
  // const [robot_serial_number, setrobot_serial_number] = useState("");
  // const [robot_model_name, setrobot_model_name] = useState("");
  // const [battery_percentege, setbattery_percentege] = useState(0.0);
  // const [battery_remaining_time, setbattery_remaining_time] = useState(0.0);
  // const [battery_remaining_distance, setbattery_remaining_distance] =
  //   useState(0);
  // const [uptime, setuptime] = useState(0);
  // const [distance_traveled, setdistance_traveled] = useState(0.0);
  // var h1;
  // var m1;
  // var s1;
  // var h;
  // var m;
  // var s;

  // useEffect(() => {
  //   const robot = new ROSLIB.Topic({
  //     ros: ros,
  //     name: "/robot_state",
  //     messageType: "robot/RobotState",
  //   });
  //   robot.subscribe((message) => {
  //     h1 = message.battery_remaining_time / 3600;
  //     m1 = (h1 % 1) * 60;
  //     s1 = (m1 % 1) * 60;
  //     h = message.uptime / 3600;
  //     m = (h % 1) * 60;
  //     s = (m % 1) * 60;

  //     setrobot_serial_number(message.robot_serial_number); //string
  //     setrobot_model_name(message.robot_model_name); // string
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
  //     setbattery_percentege(message.battery_percentege.toFixed(0) + "%" + "  "); // percentege

  //     setbattery_remaining_time(
  //       h1.toFixed(0) + " : " + m1.toFixed(0) + " : " + s1.toFixed(0)
  //     ); // secound
  //     setbattery_remaining_distance(
  //       (message.battery_remaining_distance / 1000).toFixed(3) + " " + "[Km]"
  //     ); //
  //     setuptime(h.toFixed(0) + " : " + m.toFixed(0) + " : " + s.toFixed(0));
  //     setdistance_traveled(
  //       (message.distance_traveled / 1000).toFixed(3) + " " + "[Km]"
  //     );
  //   });
  // }, [ros]);

  return (
    <div id={robotCss["robotstatue"]}>
      <Container>
        <div>
          <h2 className={robotCss["robotStatue"]}>
            Robot Statue
            <span className={robotCss["battery"]}>
              {data.battery_percentege}
              {icon}
            </span>
          </h2>
        </div>

        <div>
          <br />
        </div>
        <Row>
          <Col>
            <h5> Model </h5>
          </Col>
          <Col>
            <h5>{data.robot_model_name}</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>Serial Number</h5>
          </Col>
          <Col>
            <h5>{data.robot_serial_number}</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>Battery Remaining Distance </h5>
          </Col>
          <Col>
            {" "}
            <h5>{data.battery_remaining_distance} [KM] </h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>Battery Remaining Time </h5>
          </Col>
          <Col>
            {" "}
            <h5>{data.battery_remaining_time} % </h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5>UpTime </h5>
          </Col>
          <Col>
            <h5>{data.uptime} % </h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Traveled Distance </h5>
          </Col>
          <Col>
            <h5>{data.distance_traveled} [KM] </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TestRobot;
