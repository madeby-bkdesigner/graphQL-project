import { gql } from '@apollo/client';

export const getBooksList = gql`
  {
    books {
      id
      name
      genre
      author {
        name
        age
        country
        books {
          id
          name
          genre
        }
      }
    }
  }
`;

export const getAuthorList = gql`
  {
    authors {
      id
      name
      country
    }
  }
`;
