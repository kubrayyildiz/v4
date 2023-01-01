import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./resetPasswordCss.css";
import Input from "@material-ui/core/Input";
import axios from "axios";
// import e from "cors";

const ResetPassword = () => {
  const [email, setEmail] = useState();
  const [hint, setHint] = useState("");

  function SendResetEmail(e) {
    // setHint(
    //   "Please check your E-mail, We have sent you an email with a link to reset your password"
    // );
    const emailObject = {
      email: email,
    };
    e.preventDefault();
    axios
      .post(
        "http://192.168.109.142:5050/api/v1/users/forgetPassword",
        emailObject
      )
      .then((res) => {
        console.log("hii", res.data);
        setHint(
          "Please check your E-mail, We have sent you an email with a link to reset your password"
        );
      })
      .catch((err) => {
        console.log(err);
        setHint("The user with this e-mail does not exist");
      });
  }
  return (
    <center>
      <form className="formpassword">
        <h1 id="login">Reset Password</h1>
        <Input
          required
          title="Type your email"
          id="label"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />

        <input
          // to="/passwordreset"
          type="submit"
          value="Send"
          className="button"
          // onClick={Hint}
          onClick={SendResetEmail}
        ></input>
        <br />
        <label id="hint">{hint}</label>
      </form>
    </center>
  );
};
export default ResetPassword;
