import React, { createContext, useState } from "react";
import * as ROSLIB from "roslib";
import Config from "../scripts/Config";

export const RosContext = createContext();

const RosContextProvider = (props) => {
  var ros;
  const RosServerIp=process.env.REACT_APP_ROSBRIDGE_SERVER_IP
  const RosServerPort=process.env.REACT_APP_ROSBRIDGE_SERVER_PORT

  // process.env.Config.ROSBRIDGE_SERVER_IP
  // process.env.Config.ROSBRIDGE_SERVER_PORT

  function init_connection() {

    ros = new ROSLIB.Ros();
    try {
      ros.connect(
        "ws://" +
        RosServerIp +
        ":" +
        RosServerPort +
        ""
      );
      console.log("Ros has connected");
    } catch (error) {
      console.log(error);
    }
  }

  init_connection();
 
  console.log("Ros in context:",ros);
console.log();
  return (
    <RosContext.Provider
      value={{ros}}
    >
      {props.children}
    </RosContext.Provider>
  );
};

export default RosContextProvider;
