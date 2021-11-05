import React, { useState, useEffect } from 'react';
import { addNewBook } from '../graphQL/Mutation';
import { getAuthorList, getBooksList } from '../graphQL/Queries';
import { useMutation, useQuery } from '@apollo/client';
import './css/authors.css';
function Authors() {
  const [authors, setAuthors] = useState([]);

  /// Form Values
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  // Query and Mutation
  const [addBook, { error }] = useMutation(addNewBook);
  const { data } = useQuery(getAuthorList);

  // UseEffect to get data
  useEffect(() => {
    if (data) {
      setAuthors(data.authors);
    }
  }, [data]);

  // Form submit Function
  const formSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: name,
        genre: genre,
        authId: authorId,
      },
      refetchQueries: [{ query: getBooksList }],
    });

    if (error) {
      console.log(error);
    }

    setName('');
    setGenre('');
    setAuthorId('');
  };

  return (
    <div className="authors">
      <div className="container">
        {/* title */}
        <h1>Add author</h1>
        <form onSubmit={formSubmit}>
          <div className="form__group">
            <label htmlFor="book name">book name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="book name"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="genre">genre</label>
            <input
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              type="text"
              name="book name"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="author">author</label>
            <select
              onChange={(e) => setAuthorId(e.target.value)}
              value={authorId}
              name="author"
            >
              <option>Select author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div className="btn">
            <button type="submit">Add Author</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Authors;
