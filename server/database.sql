-- CREATE USER postgres WITH PASSWORD 'psql2022';
CREATE DATABASE booknest OWNER postgres;
-- connect to 'booknest' database: '\c booknest'
CREATE TABLE accounts (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    pwd  VARCHAR (50) NOT NULL
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR (50)  NOT NULL,
    author VARCHAR (50) NOT NULL,
    genre VARCHAR (50) NOT NULL,
    rating NUMERIC (3, 2),
    reader VARCHAR (50) NOT NULL,
    book_read VARCHAR (50) NOT NULL
);

-- Populate books table with data:
    -- INSERT INTO items (description, cost, quantity) VALUES ($1, $2, $3) RETURNING *
-- create a user:
    -- INSERT INTO accounts (username, pwd) VALUES ('booklover_44', 'iloveb00ks');

INSERT INTO books (title, author, genre, rating, reader, book_read) VALUES('The Great Gastby', 'F. Scott Fitzgerald', 'Tragedy', 5, 'booklover_44', 'Finished' );
INSERT INTO books (title, author, genre, rating, reader, book_read) VALUES('Lord of the Files', 'William Golding', 'Allegory', 5, 'booklover_44', 'Finished' );
INSERT INTO books (title, author, genre, rating, reader, book_read) VALUES('Of Mice and Men', 'John Steinbeck', 'Tragedy', 5, 'booklover_44', 'Finished' );
INSERT INTO books (title, author, genre, rating, reader, book_read) VALUES('Flowers for Algernon', 'Daniel Keyes', 'Science fiction', 5, 'booklover_44', 'In Progress' );
INSERT INTO books (title, author, genre, rating, reader, book_read) VALUES('Managing Debt For Dummies', 'John Ventura and Mary Reed', 'Nonfiction', 0, 'booklover_44', 'Not Started');
