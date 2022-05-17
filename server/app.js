const cors = require("cors");
const express = require("express");
const app = express();
const pool = require("./db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "b00ksR0ck!";
// middleware
app.use(cors());
app.use(express.json());

/*routes*/
app.get("/books", async (req, res) => {
  /**fetch all books */
  try {
    const booksQuery = await pool.query("SELECT * FROM books ORDER BY book_id");
    res.json(booksQuery.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/books/:reader", async (req, res) => {
  /**get books under reader */
  try {
    const { reader } = req.params;
    console.log(reader);
    const booksQuery = await pool.query(
      "SELECT * FROM books WHERE reader = $1 ORDER BY book_id",
      [reader]
    );
    res.json(booksQuery.rows);
  } catch (err) {
    console.error(err);
  }
});

app.post("/books", async (req, res) => {
  /**add a new book */
  try {
    const { title, author, genre, rating, reader, status } = req.body;
    const insertQuery = await pool.query(
      "INSERT INTO books (title, author, genre, rating, reader, book_read) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ",
      [title, author, genre, rating, reader, status]
    );
    res.json(insertQuery.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/books/:reader/:id", async (req, res) => {
  /**delete book by id*/
  try {
    const { reader, id } = req.params;
    console.log(id);
    const deleteBookQuery = await pool.query(
      "DELETE FROM books WHERE reader = $1 AND book_id = $2 RETURNING *",
      [reader, id]
    );
    if (!deleteBookQuery.rows.length) {
      return res.status(500).send({});
    }
    return res.json(deleteBookQuery.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/books", async (req, res) => {
  /**update book by id */
  try {
    const { title, book_id, author, genre, rating, reader, status } = req.body;
    const updateQuery = await pool.query(
      "UPDATE books SET title = $1, author = $2, genre = $3, rating = $4, reader = $5, book_read = $6 WHERE book_id = $7 RETURNING *",
      [title, author, genre, rating, reader, status, book_id]
    );
    return res.json(updateQuery.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/login", async (req, res) => {
  /**auth */
  const { username, password } = req.body;
  try {
    const userSelectQuery = await pool.query(
      "SELECT * FROM accounts WHERE username = $1",
      [username]
    );
    const user = userSelectQuery.rows[0];
    console.log(user);
    if (!user) {
      return res
        .status(500)
        .send({ status: "error", error: "invalid username/password" });
    }

    if (password === user.pwd) {
      console.log(password);
      console.log(user.user_id, user.username);
      const token = jwt.sign(
        { id: user.user_id, username: user.username },
        JWT_SECRET
      );

      return res.send({ status: "ok", data: token });
    }

    res.status(500).send({ status: "invalid username/password" });
  } catch (err) {
    console.error(err);
  }
});
app.post("/register", async (req, res) => {
  /**create a new account */
  const { username, password } = req.body;
  try {
    const insertNewUserQuery = await pool.query(
      "INSERT INTO accounts (username, pwd) VALUES ($1, $2)",
      [username, password]
    );
    return res.status(200).send({ status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: "fail" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
