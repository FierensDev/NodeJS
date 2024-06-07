const express = require("express");
const session = require('express-session');
const app = express();
const port = 3000;

const tasks = [];

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: 'azer',
  resave: false,
  saveUninitialized: true,
}))

app.set('view engine', 'ejs');

app.post('/task', (req,res) => {
  if(req.body.task){
    req.session.tasks.push({
      title : req.body.task,
      done : false
    })
  }
  res.redirect('/');
});

app.get('/task/:index/done', (req,res) => {
  if(req.session.tasks[req.params.index]){
    req.session.tasks[req.params.index].done = true;
  }
  res.redirect('/');
})
app.get('/task/:index/delete', (req,res) => {
  if(req.session.tasks[req.params.index]){
    req.session.tasks.splice(req.params.index, 1);
  }
  res.redirect('/');
})

app.get('/', (req,res) => {
  if(!req.session.tasks) {
    req.session.tasks = [];
  }
  res.render('todolist', { tasks: req.session.tasks });
})

app.listen(port, () => {
  console.log(`Serveur lancé sur le port http://127.0.0.1:${port}`)
})