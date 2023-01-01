import createPos from "./createPositionChangePasswordCss.module.css";
import { useState, useContext } from "react";
import { PositionContext } from "../../contexts/PositionContext";
import { Modal, Button, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { RiLockPasswordFill,RiLockUnlockFill } from "react-icons/ri";

function CreatePositionChangePassword() {
  const data = useContext(PositionContext);
  console.log(data);
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [password_, setpassword_] = useState(data.X);
  const [newpassword_, setnewpassword_] = useState("");
  const [confirmpassword_, setconfirmpassword_] = useState(data.Y);

  function save() {
    console.log("save");
    data.setpassword_(password_);
    data.setnewpassword_(newpassword_);
    data.setconfirmpassword_(confirmpassword_);
    data.setisoverlayShown(true);
  }
  return (
    <div>
      <Modal show={true} title="Change Password" visible={true} okText="Ok">
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="13" controlId="validationCustomUsername">
                <Form.Label className="label">Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <RiLockPasswordFill size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your old password{" "}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="13" controlId="validationCustomUsername">
                <Form.Label className="label">New Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <RiLockUnlockFill size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters
                    and numbers, and must not contain spaces, special
                    characters, or emoji.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please enter your new password{" "}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="13" controlId="validationCustomUsername">
                <Form.Label className="label">Confirm Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <RiLockPasswordFill size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your confirm password
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-15"></Row>
            <Button
              id="button3"
              onClick={() => {
                data.setisoverlayShown(false);
                console.log("cancelling");
              }}
            >
              Close
            </Button>

            <Button
              type="submit"
              id="button4"
              onClick={() => {
                save();
                console.log("ok");
              }}
            >
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreatePositionChangePassword;
