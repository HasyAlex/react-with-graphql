const express = require("express");
const app = express();
const PORT = 8081;
const {graphqlHTTP} = require("express-graphql");

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

const schema = require('./Schema/index')

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(PORT);
