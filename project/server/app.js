const express = require('express');
const bodyParser = require('body-parser');

const db = require('./utils/dataBaseUtils.js');

db.setUpConnection();

const app = express();

app.use(bodyParser, json());

app.get('/notes', (req, res)=>{
  db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res)=>{
  db.createNote(req, body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res)=>{
  db.createNote(req, params, id).then(data => res.send(data));
});

const server = app.listen(3000, ()=>{
  console.log('Hello world');
});
