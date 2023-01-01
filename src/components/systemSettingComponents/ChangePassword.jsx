import changePassw from "./changePasswordCss.module.css";
import React, { useState } from "react";
import CreatePositionChangePassword from "./CreatePositionChangePassword";
import { PositionContext } from "../../contexts/PositionContext";
const ChangePassword = () => {
  const [isOverlayShown, setisoverlayShown] = useState(false);
const [Password, setPassword] = useState(0);
const [NewPassword, setNewPassword] = useState(0);
const [ConfirmPassword, setConfirmPassword] = useState(0);
const onEdit = (record) => {
  setisoverlayShown(true);
};
const data = {
  Password,
  setPassword,
  NewPassword,
  setNewPassword,
  ConfirmPassword,
  setConfirmPassword,
  setisoverlayShown,
};
 
 return (
<PositionContext.Provider value={data}>
  <div className={changePassw["App"]}>
    <header className={changePassw["App-header"]}>
      <button className={changePassw["butonchangepassword"]} onClick={onEdit}>Change Password</button>
      {isOverlayShown && <CreatePositionChangePassword/>}
    </header>
  </div>
</PositionContext.Provider>
  );
};
export default ChangePassword;
