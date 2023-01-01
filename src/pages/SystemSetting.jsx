import React from "react";
import SystemLanguage from "../components/systemSettingComponents/SystemLanguage";
import RobotIP from "../components/systemSettingComponents/RobotIp";
import ChangePassword from "../components/systemSettingComponents/ChangePassword";
import Sidebar from "../components/consociateComponents/SideBar";
import Header from "../components/consociateComponents/Header";
import sysSet from "./systemSettingCss.module.css";




const SystemSetting = (props) => {
  return (
    <>
   <Header />
   <Sidebar />
    <div className={sysSet["container4"]}>
      <div >
        <SystemLanguage className={sysSet["systemlanguage"]} />
      </div>
      <div >
        <RobotIP className={sysSet["robotip"]} />
      </div>
      <div className={sysSet["changepassword2"]}>
        <ChangePassword />
      </div>
    </div>
     </>
  );
};

export default SystemSetting;
