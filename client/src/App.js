import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/Navbar/NavBar";
import { AddBook } from "./pages/AddBook";
import { DeleteBook } from "./pages/DeleteBook";
import { EditBook } from "./pages/EditBook";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { MyCollection } from "./pages/MyCollection";
import { Register } from "./pages/Register";
import Container from "react-bootstrap/Container";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.token !== null && localStorage.length !== 0) {
      const payload = localStorage.token.split(".")[1];
      const userToken = JSON.parse(atob(payload));
      setUser(userToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook user={user} />} />
        <Route
          path="/edit-book"
          element={
            !user ? (
              <Container>
                <h1 className="mt-5 m-auto">
                  You need to be logged in to edit books
                </h1>
              </Container>
            ) : (
              <EditBook user={user} />
            )
          }
        />
        <Route
          path="/delete-book"
          element={
            !user ? (
              <Container>
                <h1 className="mt-5 m-auto">
                  You need to be logged in to delete books
                </h1>
              </Container>
            ) : (
              <DeleteBook user={user} />
            )
          }
        />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route
          path="/collection"
          element={user ? <MyCollection user={user} /> : <Home />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
