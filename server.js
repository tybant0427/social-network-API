const express = require('express');
const app = express();
const db = require('./config/connection');
const routes = require('./routes');



const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
// require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


// app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}!`);
// });
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});