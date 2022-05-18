import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { BookList } from "../components/BookList/BookList";
import axios from "axios";
export const DeleteBook = ({ user }) => {
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {}, []);

  const deleteBook = async () => {
    try {
      const response = await axios.delete(`/books/${user.username}/${id}`);
      console.log(response);
      alert("book deleted successfully");
      window.location.reload();
    } catch (error) {
      alert("id doesn't exist under this account/ already deleted");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteBook();
  };

  return (
    <Container>
      <BookList user={user} />
      <Form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-5"
        validated={validated}
      >
        <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
          <Form.Label column sm={1}>
            Book ID
          </Form.Label>
          <Col sm={3}>
            <Form.Control
              onChange={(e) => {
                setId(e.target.value);
              }}
              required
              type="number"
              placeholder="id"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 5, offset: 1 }}>
            <Button variant="danger" type="submit">
              Delete
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};
