const cors = require("cors");
const express = require("express");
const app = express();
const pool = require("./db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "b00ksR0ck!";
// middleware
app.use(cors());
app.use(express.json());

// routes

// create a todo
// app.post("/todos", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO todo (description) VALUES ($1) RETURNING *",
//       [description]
//     );

//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // get a todo
// app.get("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
//       id,
//     ]);

//     res.json(todo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// get all todos

// fetch all books
app.get("/books", async (req, res) => {
  try {
    const booksQuery = await pool.query("SELECT * FROM books");
    res.json(booksQuery.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/books/:reader", async (req, res) => {
  try {
    const { reader } = req.params;
    console.log(reader);
    const booksQuery = await pool.query(
      "SELECT * FROM books WHERE reader = $1",
      [reader]
    );
    res.json(booksQuery.rows);
  } catch (err) {
    console.error(err);
  }
});
app.post("/books", async (req, res) => {
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
  try {
    const { book_id, author, genre, rating, reader, status } = req.body;
    const updateQuery = await pool.query(
      "UPDATE items SET author = $2, genre = $3, rating = $4, reader = $5, status = $6 WHERE id = $1 RETURNING *",
      [book_id, author, genre, rating, reader, status]
    );
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/login", async (req, res) => {
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

// update a todo
// app.put("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateTodo = await pool.query(
//       "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
//       [description, id]
//     );

//     res.json(updateTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // delete a todo
// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteTodo = await pool.query(
//       "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
//       [id]
//     );

//     res.json(`Todo[${id}] was deleted.`);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
