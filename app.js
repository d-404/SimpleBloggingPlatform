const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'BlogPlatform',
    password: 'root',
    port: 5432,
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Route for displaying all blogs
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blogs ORDER BY id DESC');
        const blogs = result.rows;
        res.render('all-blogs', { blogs });
    } catch (error) {
        console.error('Error fetching blogs from the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for creating a new blog
app.get('/create', (req, res) => {
    res.render('create-blog');
});

// Route for handling the form submission and creating a new blog
app.post('/create-blog', async (req, res) => {
    const { title, content } = req.body;
    try {
        await pool.query('INSERT INTO blogs (title, content) VALUES ($1, $2)', [title, content]);
        res.redirect('/');
    } catch (error) {
        console.error('Error creating a new blog:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for displaying a single entire blog and all comments
app.get('/blog/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
        const blog = result.rows[0];

        // Retrieve comments for the selected blog
        const commentsResult = await pool.query('SELECT * FROM comments WHERE blog_id = $1', [id]);

        const comments = commentsResult.rows;
        // console.log(comments)
        if (blog) {
            res.render('single-blog', { blog, comments });
        } else {
            res.status(404).send('Blog not found');
        }
        if (blog) {
            res.render('single-blog', { blog });
        } else {
            res.status(404).send('Blog not found');
        }
    } catch (error) {
        console.error('Error fetching a single blog:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for handling comment submissions
app.post('/blog/:id/add-comment', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        await pool.query('INSERT INTO comments (blog_id, content) VALUES ($1, $2)', [id, comment]);
        res.redirect(`/blog/${id}`);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
