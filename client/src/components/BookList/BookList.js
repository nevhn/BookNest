import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactStars from "react-rating-stars-component";
export const BookList = ({ user }) => {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/books/${user.username}`
      );
      console.log(response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("err", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, [user]);
  return (
    <Table className="mt-5" striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Status</th>
          <th>Rating</th>
          <th>Reader</th>
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
  );
};
