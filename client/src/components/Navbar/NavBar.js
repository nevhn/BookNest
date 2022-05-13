import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

export const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">BookNest</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="add-book">Add a book</Nav.Link>
            <Nav.Link href="edit-book">Edit a book</Nav.Link>
            <Nav.Link href="delete-book">Delete a book</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="justify-content-end">
          <Nav.Link href="#home">Login</Nav.Link>
          <Nav.Link href="#link">Register</Nav.Link>
        </Nav>
        {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
      </Container>
    </Navbar>
  );
};
