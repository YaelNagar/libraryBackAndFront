import React, { useEffect, useState } from "react";
import "../style/BookList.css";

const BookList = () => {
  const path = "http://localhost:5000/api/books";
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setId] = useState(null);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${path}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setBooks(await response.json());
      } catch (err) {
        setError("Failed to fetch books");
      }
    };
    fetchBooks();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }, [error]);

  const deleteBooks = async (id) => {
    try {
      const response = await fetch(`${path}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      setError("Failed to delete book");
    }
  };

  const updateBook = async () => {
    try {
      const response = await fetch(`${path}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setBooks(await response.json());
    } catch (err) {
      setError("Failed to update book");
    }
  };

  const addNewBook = async () => {
    try {
      const response = await fetch(`${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author }),
      });
      setBooks(await response.json());
    } catch (err) {
      setError("Failed to add book");
    }
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    flag ? addNewBook() : updateBook();
    setId(null);
    setFlag(false);
    setAuthor("");
    setTitle("");
  };

  const setFileds = (id) => {
    const bookToUpdate = books.find((b) => b.id === id);
    setId(bookToUpdate.id);
    setTitle(bookToUpdate.title);
    setAuthor(bookToUpdate.author);
  };

  return (
    <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Books</h2>
      <button className="btn btn-info" onClick={() => setFlag(true)}>
        Add New Book
      </button>
    </div>
    {error && (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    )}
      {id != null || flag ? (
        <form
          onSubmit={handleSubmit}
          className="mb-4 p-3 bg-light rounded shadow-sm"
        >
          <div className="form-group">
            <label>Book Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={handleChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Book Author:</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={handleChangeAuthor}
            />
          </div>  
          <button type="submit" className="btn btn-primary mt-3">
            {flag ? "Add Book" : "Update Book"}
          </button>
        </form>
      ) : (
        <></>
      )}
      <div className="list-group shadow-sm">
        {books.map((book) => (
          <div
            key={book.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 className="mb-1">{book.title}</h5>
              <p className="mb-0 text-muted">by {book.author}</p>
            </div>
            <div>
              <button
                className="btn btn-outline-danger btn-sm mr-2"
                onClick={() => deleteBooks(book.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setFileds(book.id)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
