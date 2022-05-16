import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
export const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const loginUser = async () => {
    const body = {
      username,
      password,
    };
    try {
      const response = await axios.post("http://localhost:8080/login", body);
      console.log(response);
      console.log(response.status);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.data);

        window.location.replace("/");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid username/password");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };
  return (
    <Container className="mt-5">
      <h1>Login</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter username"
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};
