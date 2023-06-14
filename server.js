const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const app = express();
let db = JSON.parse(fs.readFileSync('./db/db.json'));
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});   

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.post('/api/notes', (req, res) => {
  let userNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  db.push(userNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(db));
  res.json(db);
  });
  
  app.delete('/api/notes/:id', (req, res) => {
    let deleteNote =db.filter((note) => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
