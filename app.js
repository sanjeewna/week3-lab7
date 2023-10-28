const express = require('express');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Static files middleware (for CSS, JavaScript, etc.)
app.use(express.static('public'));

// Body-parser middleware for parsing POST data
app.use(express.urlencoded({ extended: true }));

// Books data (for simplicity, we'll use an array)
let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  // Add more books as needed
];

// Routes
app.get('/', (req, res) => {
  // Display a list of all books
  res.render('index', { books });
});

app.get('/book/:id', (req, res) => {
  // Show details of a single book
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  res.render('book', { book });
});

app.get('/add', (req, res) => {
  // Show the add book form
  res.render('add');
});

app.post('/add', (req, res) => {
  // Add a new book to the list
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});