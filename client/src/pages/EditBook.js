import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ReactStars from "react-rating-stars-component";
import { BookList } from "../components/BookList/BookList";
import axios from "axios";

export const EditBook = ({ user }) => {
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [genre, setGenre] = useState();
  const [status, setStatus] = useState();
  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };
  const updateBook = async () => {
    let body = {
      book_id: id,
      author,
      genre,
      rating: status == "Not Started" ? 0 : rating,
      reader: user.username,
      status,
    };
    const response = await axios.put("http://localhost:8080/books");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook();
  };
  return (
    <Container>
      <BookList user={user} />
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
          <Form.Label column sm={1}>
            Book ID
          </Form.Label>
          <Col sm={10}>
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
        <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
          <Form.Label column sm={1}>
            Book title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              type="text"
              placeholder="title"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
          <Form.Label column sm={1}>
            Author
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              required
              type="text"
              placeholder="author"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
          <Form.Label column sm={1}>
            Genre
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={(e) => {
                setGenre(e.target.value);
              }}
              required
              type="text"
              placeholder="genre"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
          <Form.Label column sm={1}>
            Status
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              onChange={(e) => setStatus(e.target.value)}
              required
              aria-label=""
            >
              <option value="" disabled selected>
                Select status
              </option>
              <option value="Finished">Finished</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
          <Form.Label column sm={1}>
            Rating
          </Form.Label>
          <Col sm={10}>
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
            <Button variant="dark" type="submit">
              Update
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};
