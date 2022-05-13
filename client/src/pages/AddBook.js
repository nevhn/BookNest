import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import ReactStars from "react-rating-stars-component";

export const AddBook = () => {
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
      <Form className="mt-5" validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
          <Form.Label column sm={1}>
            Book title
          </Form.Label>
          <Col sm={10}>
            <Form.Control required type="text" placeholder="The Great Gatsby" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
          <Form.Label column sm={1}>
            Author
          </Form.Label>
          <Col sm={10}>
            <Form.Control required type="text" placeholder="Last name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
          <Form.Label column sm={1}>
            Genre
          </Form.Label>
          <Col sm={10}>
            <Form.Control required type="text" placeholder="Last name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
          <Form.Label column sm={1}>
            Status
          </Form.Label>
          <Col sm={10}>
            <Form.Control required type="text" placeholder="Last name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
          <Form.Label column sm={1}>
            Rating
          </Form.Label>
          <Col sm={10}>
            {/* <Form.Control required type="text" placeholder="Last name" /> */}
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 5, offset: 1 }}>
            <Button type="submit">Submit</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};
