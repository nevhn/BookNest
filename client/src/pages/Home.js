import React from "react";
import ReactStars from "react-rating-stars-component";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
export const Home = () => {
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
            {Array.from({ length: 7 }).map((_, index) => (
              <th key={index}>Title</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            {Array.from({ length: 7 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            <td>2</td>
            {Array.from({ length: 7 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            <td>3</td>
            {Array.from({ length: 7 }).map((_, index) => (
              <td key={index}>
                Table cell {index}
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
