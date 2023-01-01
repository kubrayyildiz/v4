import React, {  useState } from "react";
// import "../Css/SystemSetting.css";
import CreatePositionRobotIp from "./CreatePositionRobotIp";
import { PositionContext } from "../../contexts/PositionContext";
import robot from "./robotIpCss.module.css";

function RobotIP(props) {
  const [isOverlayShown, setisoverlayShown] = useState(false);
  const [RobotIP, setRobotIP] = useState(0);
  const onEdit = (record) => {
    setisoverlayShown(true);
  };

  const data = {
    RobotIP,
    setRobotIP,
    setisoverlayShown,
  };
  // className={robot["App"]}
  // className={robot["App-header"]}
  
  return (
    <PositionContext.Provider value={data}>
      <div >
        <header >
          <button className={robot["butonrobotip"]} onClick={onEdit}>Robot IP</button>
          {isOverlayShown && <CreatePositionRobotIp></CreatePositionRobotIp>}
        </header>
      </div>
    </PositionContext.Provider>
  );
}

export default RobotIP;
