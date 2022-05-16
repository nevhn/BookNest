import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";
// import NavDropdown from "react-bootstrap/NavDropdown";

export const NavBar = ({ user }) => {
  const location = useLocation();

  const handleLogout = () => {
    console.log("logged out");
    localStorage.removeItem("token");
    window.location.replace("/");
  };

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
            {user ? <Nav.Link href="collection">My collection</Nav.Link> : null}
          </Nav>
        </Navbar.Collapse>
        {user ? (
          <Nav.Link onClick={handleLogout}>{user.username}(logout)</Nav.Link>
        ) : (
          <Nav className="justify-content-end">
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="register">Register</Nav.Link>
          </Nav>
        )}
        {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
      </Container>
    </Navbar>
  );
};
