const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const PORT = 5000;
const { MONGOURI } = require('./keys');

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("Connection to MongoDB was successful!");
  })
  .catch((err) => {
    console.log("Connection to MongoDB was unsuccessful!!", err);
  });

require('./models/users');
require('./models/post');

// Use the cors middleware
app.use(cors());

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
