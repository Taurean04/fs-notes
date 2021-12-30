const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3002;
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
];

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

app.use(requestLogger);

app.get('/', (req, res) => res.send('<h1>Hello World</h1>'));

app.get('/api/notes', (req, res) => res.json(notes));

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(n => n.id === (id));
  if(!note){
    res.status(404).end()
  }
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(n => n.id !== (id));
  res.status(204).end()
});

const generateId = () => {
  const max_id = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return max_id + 1;
}

app.post('/api/notes', (req, res) => {
  if(!req.body.content){
    return res.status(400).json({error: 'Content missing'});
  }
  const note = {
    content: req.body.content,
    important: req.body.important || false,
    date: new Date(),
    id: generateId()
  };
  notes = notes.concat(note);
  console.log(note);
  res.json(note);
})


app.use(unknownEndpoint);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const app = http.createServer((req, res) => {    
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   res.end(JSON.stringify(notes))
// });

// app.listen(PORT);
// console.log(`Server running on port ${PORT}`)