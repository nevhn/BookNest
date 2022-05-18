import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

export const AddBook = ({ user }) => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [genre, setGenre] = useState();
  const [status, setStatus] = useState();
  const [rating, setRating] = useState(0);

  const uploadBook = async () => {
    let body = {
      title,
      author,
      genre,
      rating: status == "Not Started" ? 0 : rating,
      reader: user ? user.username : "anonymous",
      status,
    };
    console.log(body);
    try {
      const response = await axios.post("/books", body);
      console.log(response.data);
      alert("Book added successfully");
    } catch (err) {
      console.error(err);
      alert("Error:", err);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    uploadBook();
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };
  return (
    <Container className="mt-5">
      <h1>
        You can add a book anonymously or login to save to your collection
      </h1>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={1}>
            Book title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              required
              type="text"
              placeholder="The Great Gatsby"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={1}>
            Author
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={(e) => setAuthor(e.target.value)}
              required
              type="text"
              placeholder="F. Scott Fitzgerald"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={1}>
            Genre
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={(e) => setGenre(e.target.value)}
              required
              type="text"
              placeholder="Tragedy"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
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
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
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
