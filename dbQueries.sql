CREATE DATABASE BlogPlatform;


CREATE TABLE blogs (
    id serial PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT
);


CREATE TABLE comments (
    id serial PRIMARY KEY,
    blog_id INT REFERENCES blogs(id),
    content TEXT
);