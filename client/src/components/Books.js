import React, { useEffect, useState } from 'react';
import { getBooksList } from '../graphQL/Queries';
import { removeBookMutation } from '../graphQL/Mutation';
import { useQuery, useMutation } from '@apollo/client';
import './css/books.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [otherBooks, setOtherBooks] = useState([]);
  const [removeBook] = useMutation(removeBookMutation);
  const {
    error: booksError,
    loading: booksLoading,
    data: booksData,
  } = useQuery(getBooksList);

  const [bookInfo, setBookInfo] = useState({
    empty: true,
    book: [],
    author: [],
  });

  // Fetching the books data
  useEffect(() => {
    if (booksData && !booksLoading) {
      setBooks(booksData.books);
    }
    if (booksError) alert(booksError);
  }, [booksData, booksError, booksLoading]);

  // Finding specific book
  const findBookData = (id) => {
    let book = books.find((book) => book.id === id);
    if (book) {
      setBookInfo({
        empty: false,
        book: book,
        author: book.author,
      });
      setOtherBooks(book.author.books);
    }
  };

  // Removing book
  const removeBookFunc = (id) => {
    removeBook({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: getBooksList }],
    });
    setBookInfo({
      empty: true,
    });
  };

  return (
    <div className="books">
      <div className="container">
        <div className="main">
          {/* title */}
          <h1>Khalid's favorite books</h1>
          {/* book list */}
          <ul>
            {books.map((book) => (
              <li onClick={() => findBookData(book.id)} key={book.id}>
                {book.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="aside">
          <h1>Book</h1>
          {!bookInfo.empty && (
            <div className="book__info__div">
              <span>
                {' '}
                <span className="span__title">Author:</span>{' '}
                <span className="author">{bookInfo.author.name}</span>
              </span>
              <div className="book__info">
                <p>
                  {' '}
                  <span className="span__title">Book Name</span>:{' '}
                  {bookInfo.book.name}
                </p>
                <p>
                  {' '}
                  <span className="span__title">Book Genre:</span>{' '}
                  {bookInfo.book.genre}
                </p>
              </div>
              <button
                onClick={() => removeBookFunc(bookInfo.book.id)}
                className="remove__btn"
              >
                remove book
              </button>
              <div className="about__author">
                <h2>about the author</h2>
                <div className="content">
                  <p>
                    name:{' '}
                    <span className="content__header">
                      {' '}
                      {bookInfo.author.name}{' '}
                    </span>{' '}
                  </p>
                  <p>
                    age:{' '}
                    <span className="content__header">
                      {' '}
                      {bookInfo.author.age}{' '}
                    </span>{' '}
                  </p>
                  <p>
                    country:{' '}
                    <span className="content__header">
                      {' '}
                      {bookInfo.author.country}{' '}
                    </span>{' '}
                  </p>
                  <div className="other__books">
                    <h3>All books by this author</h3>
                    {otherBooks.map((book) => (
                      <li key={book.id}>
                        {book.name}{' '}
                        <span className="genre">({book.genre})</span>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Binding graphqlQuery to books
export default Books;
