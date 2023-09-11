# My Blog Platform

**My Blog Platform** is a simple web application built using Node.js and PostgreSQL for managing and displaying blog posts. It allows users to create new blog posts, view a list of all blogs, and read individual blog posts.

## Features

- **Create Blog**: Users can create new blog posts by providing a title and content.

- **View All Blogs**: The application provides a list of all available blogs, displaying their titles and a brief preview of content.

- **View Single Blog**: Users can click on a blog to view the full content of that blog.

- **Add Comments**: On the single blog view, users can add comments to share their thoughts on the blog post.

## Technologies Used

- Node.js: For building the server and handling backend logic.
- PostgreSQL: As the database management system for storing blog posts and comments.
- Express.js: For routing and handling HTTP requests.
- EJS (Embedded JavaScript): As the templating engine for rendering HTML pages.
- HTML/CSS: For the frontend user interface.

## Setup and Installation

- cd my-blog-platform
- npm install express pg ejs body-parser
- node app.js