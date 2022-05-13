-- CREATE USER postgres WITH PASSWORD 'psql2022';
CREATE DATABASE booknest OWNER postgres;
-- connect to 'booknest' database: '\c booknest'
CREATE TABLE accounts (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR (50)  NOT NULL,
    author VARCHAR (50) NOT NULL,
    genere VARCHAR (50) NOT NULL,
    ratings VARCHAR (50),
    reader VARCHAR (50) NOT NULL,
    status VARCHAR (50) NOT NULL
);