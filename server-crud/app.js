const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

//BOOKS LIST
let books = [
  {
    id: 0,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    id: 4,
    title: "Moby-Dick",
    author: "Herman Melville",
  },
  {
    id: 5,
    title: "War and Peace",
    author: "Leo Tolstoy",
  },
  {
    id: 6,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
  },
  {
    id: 7,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    id: 8,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
  },
  {
    id: 9,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
  }
];

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  res.json(book);
});

//update
app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }
  books[bookIndex] = { ...books[bookIndex], title, author };
  res.json(books);
});

//adding
app.post("/api/books", (req, res) => {
  const { title, author } = req.body; 
  if (!title || !author) {
    return res.status(400).send("Missing required fields: title and author.");
  }
  const newBook = { id: Date.now(), title, author };
  books.push(newBook)
  res.status(201).json(books);
});

app.delete("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((x) => x.id != bookId);
  res.status(204).send();
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
