const {find, filter} = require('lodash');
const { books, authors } = require("./data");
const { PubSub} = require("apollo-server");

const pubsub = new PubSub();

const BOOK_ADDED = "BOOK_ADDED";

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED])
    }
  },
  Query: {
    hello: () => 'world',
    author: (p,  { id }) => find(authors, { id: id }),
    authors: () => authors,
    books: () => books
  },
  Mutation: {
    addBook: (parent, args) => {
      const { title, author : id = null } = args;
      const authorID = +id;
      const authorExist = authors.some(x => x.id === authorID);
      const newBoook = {
        id: books.length + 1,
        author: authorID,
        title,
        vote: 0
      };
      if(authorExist) {
        books.push(newBoook);
        pubsub.publish(BOOK_ADDED, { bookAdded: newBoook });
        return newBoook;
      }
    }
  },
  Author: {
    books: ({ id }) => filter(books, { author: id})
  },
  Book: {
    author: ({ id, author }) => authors.find(x => x.id === author)
  }
};

module.exports = resolvers;
