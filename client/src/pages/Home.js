import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
export const Home = () => {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/books");
      console.log(response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("err", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    //   avoid D.R.Y: make a table component and pass props to change table size
    <Container className="mt-5">
      <Table responsive>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Reader</th>
            {/* {Array.from({ length: 7 }).map((_, index) => (
              <th key={index}>Title</th>
            ))} */}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr>
              <td>{book.book_id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.book_read}</td>
              <td>
                <ReactStars
                  count={5}
                  value={book.rating}
                  // onChange={ratingChanged}
                  edit={false}
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </td>
              <td>{book.reader}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
