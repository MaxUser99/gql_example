const data = require("./data");
const { schema, bookSchema } = require("./schema");
const resolvers = require("./resolvers");
const { mergeSchemas } = require("apollo-server");

const mainSchema = mergeSchemas({
  schemas: [
    schema,
    bookSchema
  ],
  resolvers: [
    resolvers
  ]
});

module.exports = {
  ...data,
  schema: mainSchema
};
