// const mongoose = require('mongoose');
// const User = require('./models/User');

// async function main(){
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');

//   console.log("Connexion ok");

//   const user1 = new User({
//     email: "test@test.com",
//     firstName: "test",
//     lastName: "lasttest"
//   })

//   await user1.save()

//   mongoose.disconnect();  
// }

// main();

const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require('./routes/user.routes')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/phototheque')

app.get('/', (req, res) => {
  res.send('ok');
})

app.use('/user', userRoutes);

app.use((req,res) => {
  res.status(404);
  res.send('Page not found');
})

app.listen(port, () => {
  console.log(`Application : http://127.0.0.1:${port}`);
});