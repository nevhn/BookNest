import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/Navbar/NavBar";
import { AddBook } from "./pages/AddBook";
import { DeleteBook } from "./pages/DeleteBook";
import { EditBook } from "./pages/EditBook";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

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
              <h1 className="mt-5">You need to be logged in to edit books</h1>
            ) : (
              <EditBook user={user} />
            )
          }
        />
        <Route
          path="/delete-book"
          element={
            !user ? (
              <h1 className="mt-5">You need to be login to delete books </h1>
            ) : (
              <DeleteBook user={user} />
            )
          }
        />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
