import { useState, useContext } from "react";
import React from "react";
import { PositionContext } from "../../contexts/PositionContext";
import { Modal, Button, Form } from "react-bootstrap";
import createPos from "./createPositionCss.module.css";
import axios from "axios";
import { TablesContext } from "../../contexts/TablesContext";
function CreatePosition() {
  const data = useContext(PositionContext);
  const [x, setx] = useState(data.click_position.x);
  const [y, sety] = useState(data.click_position.y);
  const [rotation, setrotation] = useState(data.click_position.rotation);
  const { getAllTables } = useContext(TablesContext);

  const [name, setname] = useState("");

  function save() {
    const positionData = {
      name: name,
      x: x,
      y: y,
      rotation: rotation,
    };
    axios
      .post(
        "http://192.168.109.142:5050/api/v1/ros/positionMarker",
        positionData
      )
      .then((res) => {
        console.log("post method test");
        data.setisoverlayShown(false);
        data.Enable();
        getAllTables();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function get_robot_position() {
    setx(data.robot_position.x);
    sety(data.robot_position.y);
    setrotation(data.robot_position.rotation);
  }

  return (
    <div>
      <Modal show={true} title="Create position">
        <Modal.Header>
          <Modal.Title>Create Position</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="positionName">
              <Form.Label> Position Name:</Form.Label>
              <Form.Control
                required
                type="text"
                name="Position Name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="PositionX">
              <Form.Label> Position X:</Form.Label>
              <Form.Control
                required
                type="text"
                name="PositionX"
                value={x}
                onChange={(e) => {
                  setx(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="PositionY">
              <Form.Label> Position Y:</Form.Label>

              <Form.Control
                required
                type="text"
                name="PositionY"
                value={y}
                onChange={(e) => {
                  sety(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="positionRotation">
              <Form.Label> Position Rotation:</Form.Label>

              <Form.Control
                required
                type="text"
                name="PositionY"
                value={rotation}
                onChange={(e) => {
                  setrotation(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id={createPos["button1"]}
            onClick={() => {
              data.setisoverlayShown(false);
              data.Enable();
              console.log("cancelling");
            }}
          >
            Close
          </Button>
          <Button
            id={createPos["button2"]}
            onClick={() => {
              save();
              console.log("Saved");
            }}
          >
            Save Changes
          </Button>
          <Button
            id={createPos["button2"]}
            onClick={() => {
              get_robot_position();
              // props.Enable();
            }}
          >
            Get Robot Position{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default CreatePosition;
