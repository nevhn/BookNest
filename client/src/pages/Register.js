import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";

export const Register = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const registerUser = async () => {
    const body = {
      username,
      password,
    };
    try {
      const response = await axios.post("http://localhost:8080/register", body);
      console.log(response);
      console.log(response.status);
      alert("Account created successfully");
      window.location.replace("/");
    } catch (err) {
      console.error(err);
      alert("username already exists");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };
  return (
    <Container className="mt-5">
      <h1>Register</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter username"
          />
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
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};
