const { gql } = require("apollo-server");

const bookSchema = gql`
    type Book{
        id: ID!
        title: String!
        author: Author!
    }
`;

const schema = gql`
    type Author{
        id: ID!
        name: String!
        books: [Book]
    }

    type Query {
        hello: String!
        authors: [Author]
        author(id: Int!): Author
        books: [Book]
    }
  
  type Mutation {
      addBook(title: String!, author: ID): Book 
  }
  
  type Subscription {
      bookAdded: Book
  }
`;

module.exports = {
  bookSchema,
  schema
};
