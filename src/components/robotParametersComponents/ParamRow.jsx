import * as ROSLIB from "roslib";
import React, { useEffect, useState, useRef, useContext } from "react";
import { IconButton } from "rsuite";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { RosContext } from "../../contexts/RosContext";
import pScreen from "./paramRowCss.module.css";

const ParamRow = (props) => {
  const { ros } = useContext(RosContext);
  var paramName = props.paramName;
  console.log(paramName);
  const [value, setvalue] = useState(0);
  const [description, setdescription] = useState(0);
  const [isEdit, setisEdit] = useState(false);
  const input = useRef(null);
  useEffect(() => {
    var paramDesc = new ROSLIB.Param({
      ros: ros,
      name: paramName, //+ "/description",
    });
    paramDesc.get((value) => {
      setdescription(value.description);
      setvalue(value.value);
    });
  }, []);

  function edit() {
    setisEdit(true);
    input.current.value = value;
  }
  function save() {
    setisEdit(false);
    setvalue(Number(input.current.value));
    var paramValue = new ROSLIB.Param({
      ros: ros,
      name: paramName + "/value",
    });
    paramValue.set(Number(input.current.value));
  }
  function cancel() {
    setisEdit(false);
    paramName.set(Number(input.current.value));
  }

  return (
    <Row>
      <Col>
        <p className={pScreen["paramName"]}>{paramName}</p>
      </Col>

      <Col className={pScreen["description"]}>
        <p>{description}</p>
      </Col>
      {!isEdit && (
        <Col>
          <p className={pScreen["value"]}>{value}</p>
        </Col>
      )}
      {isEdit && (
        <Col>
          <input
            className={pScreen["input"]}
            ref={input}
            type="text"
            name={value}
            placeholder={value}
          />
        </Col>
      )}

      {!isEdit && (
        <Col>
          <IconButton
            className={pScreen["a"]}
            icon={<FaEdit size={25} />}
            onClick={edit}
          ></IconButton>
        </Col>
      )}
      {isEdit && (
        <Col className={pScreen["bc"]}>
          <IconButton
            className={pScreen["b"]}
            icon={<FaSave size={25} />}
            onClick={save}
          ></IconButton>
          <IconButton
            className={pScreen["c"]}
            icon={<MdCancel size={25} />}
            onClick={cancel}
          ></IconButton>
        </Col>
      )}
      {/* <hr/> */}
    </Row>
  );
};

export default ParamRow;
