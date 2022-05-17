import React from "react";
import Container from "react-bootstrap/Container";
import { BookList } from "../components/BookList/BookList";

export const MyCollection = ({ user }) => {
  return (
    <Container>
      <BookList user={user} />
    </Container>
  );
};
