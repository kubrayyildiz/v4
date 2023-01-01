import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import paramButPos from "./paramButtonPositionCss.module.css";
import { useContext } from "react";
import { TablesContext } from "../../contexts/TablesContext";

const ParamButtonPosition = (props) => {
  // const [content, setContent] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [_id, setId] = useState();
  const { getAllTables, content } = useContext(TablesContext);

  const getTableData = (id) => {
    axios
      .post(`http://192.168.109.142:5050/api/v1/ros/sendGoal/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (item) => {
    axios
      .delete(
        `http://192.168.109.142:5050/api/v1/ros/positionMarker/${item._id}`
      )
      .then((res) => {
        console.log("user deleted");
        getAllTables();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showDeleteList = (event) => {
    setIsShown(true);
  };
  const handleCancel = (event) => {
    setIsShown((a) => !a);
  };
  useEffect(() => {
    getAllTables();
  }, []);
  return (
    <div className={paramButPos["allButton"]}>
      <div className={paramButPos["twoButton"]}>
        <button
          className={paramButPos["deletebutton"]}
          onClick={showDeleteList}
        >
          Delete
        </button>
        <button className={paramButPos["cancelbutton"]} onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <div className={paramButPos["responsive"]}>
        {content.map((item) => (
          <div>
            {!isShown && (
              <button
                className={paramButPos["button"]}
                onClick={() => getTableData(item._id)}
              >
                {item.name}
              </button>
            )}

            {isShown && (
              <button
                className={paramButPos["showCancelButton"]}
                onClick={() => handleDelete(item)}
              >
                {item.name}
                <MdOutlineClose size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParamButtonPosition;
// import * as ROSLIB from "roslib";
// import React, { useEffect, useState, useRef, useContext } from "react";
// import { RosContext } from "../../contexts/RosContext";
// import paramButPos from "./paramButtonPositionCss.module.css";

// const ParamButtonPosition = (props) => {
//   const { ros } = useContext(RosContext);
//   // const ros = props.ros;
//   var paramName = props.paramName;

//   console.log(paramName);
//   const [name, setName] = useState(0);
//   const [rotation, setRotation] = useState(0);
//   const [position, setPosition] = useState(0);
//   const input = useRef(null);
//   useEffect(() => {
//     var paramDesc = new ROSLIB.Param({
//       ros: ros,
//       name: paramName,
//     });
//     paramDesc.get((value) => {
//       console.log(value);
//       setName(value.name);
//       setRotation(value.rotation);
//       setPosition(value.position);
//     });
//   }, []);

//   function sendGoal() {
//     var topic = new ROSLIB.Topic({
//       ros: ros,
//       name: "/PositionMarkerGoal",
//       messageType: "std_msgs/String",
//     });

//     var msg = new ROSLIB.Message({
//       data: name,
//     });
//     topic.publish(msg);
//   }

//   return (
//     <button className={paramButPos["button"]} onClick={sendGoal}>
//       {name}
//     </button>
//   );
// };

// export default ParamButtonPosition;
