import { gql } from '@apollo/client';

export const addNewBook = gql`
  mutation addBook($name: String!, $genre: String!, $authId: ID!) {
    addBook(name: $name, genre: $genre, authId: $authId) {
      id
      name
      genre
    }
  }
`;

export const removeBookMutation = gql`
  mutation removeBook($id: ID!) {
    removeBook(id: $id) {
      name
      genre
    }
  }
`;
