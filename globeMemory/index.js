const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require('./routes/user.routes')
const boardRoutes = require('./routes/board.routes')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/phototheque')

app.use('/user', userRoutes);
app.use('/board', boardRoutes)

app.use((req,res) => {
  res.status(404);
  res.send('Page not found');
})

app.listen(port, () => {
  console.log(`Application : http://127.0.0.1:${port}`);
});