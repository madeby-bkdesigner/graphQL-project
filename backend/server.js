require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const schema = require('./schema/schema');

const uri = process.env.GQL_DATABASE;
const dockerUri = "mongodb://admin:password@localhost:27017"
const dockerUriLink = "mongodb://admin:password@mongodb"
mongoose.connect(dockerUriLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => console.log('Connected To DB'));

app.use(cors({ origin: true }));

// Using GraphQl schema
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
