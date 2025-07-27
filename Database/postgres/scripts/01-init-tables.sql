-- PostgreSQL compatible version of the database initialization script

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(100) PRIMARY KEY,
    fullname VARCHAR(100),
    password TEXT
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    body TEXT,
    starttime TIMESTAMP,
    endtime TIMESTAMP
);
