import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ReactStars from "react-rating-stars-component";
import { BookList } from "../components/BookList/BookList";
export const DeleteBook = () => {
  const [validated, setValidated] = useState(false);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Container>
      <BookList />
      <Form className="mt-5" validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
          <Form.Label column sm={1}>
            Book ID
          </Form.Label>
          <Col sm={3}>
            <Form.Control required type="number" placeholder="42" />
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
