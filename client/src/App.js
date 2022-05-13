import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import "./App.css";

// components
// import InputTodo from "./components/InputTodo";
// import ListTodos from "./components/ListTodos";
import { NavBar } from "./components/Navbar/NavBar";
import { AddBook } from "./pages/AddBook";
import { DeleteBook } from "./pages/DeleteBook";
import { EditBook } from "./pages/EditBook";
import { Home } from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book" element={<EditBook />} />
        <Route path="/delete-book" element={<DeleteBook />} />
        <Route path="/login" element={<EditBook />} />
        <Route path="/register" element={<DeleteBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
