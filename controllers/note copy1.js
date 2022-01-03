const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const Note = require('./models/note');
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

let notes_arr = [
	{
		id: 1,
		content: 'HTML is easy',
		date: '2019-05-30T17:30:31.098Z',
		important: true
	},
	{
		id: 2,
		content: 'Browser can execute only Javascript',
		date: '2019-05-30T18:39:34.091Z',
		important: false
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		date: '2019-05-30T19:20:14.298Z',
		important: true
	}
];



const requestLogger = (req, res, next) => {
	console.log('Method:', req.method);
	console.log('Path:  ', req.path);
	console.log('Body:  ', req.body);
	console.log('---');
	next();
};
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(requestLogger);

app.get('/', (req, res) => res.send('<h1>Hello World</h1>'));

app.get('/api/notes', (req, res) => {
	Note.find({})
		.then(notes => {
			notes = notes_arr.concat(notes);
			res.json(notes);
		});
});

app.get('/api/notes/:id', (req, res, next) => {
	const id = Number(req.params.id);
	const noted = notes_arr.find(n => n.id === (id));
	if(noted){
		res.json(noted);
	}
	Note.findById(req.params.id)
		.then(note => {
			if(!note){
				res.status(404).end();
			}
			res.json(note);
		}).catch(e => next(e));
});

// .catch(e => {
//   console.log(e);
//   res.status(400).send({error: 'malformatted ID'});
// })
app.delete('/api/notes/:id', (req, res, next) => {
	const id = Number(req.params.id);
	const noted = notes_arr.find(n => n.id === (id));
	if(noted){
		notes_arr = notes_arr.filter(n => n.id !== (id));
		res.status(204).end();
	}
	Note.findByIdAndRemove(req.params.id)
		.then(result => {
			console.log(result);
			res.status(204).end();
		})
		.catch(e => next(e));
});

// const generateId = () => {
//   const max_id = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
//   return max_id + 1;
// }

app.post('/api/notes', (req, res, next) => {
	const body = req.body;
	if(!body.content){
		return res.status(400).json({ error: 'Content missing' });
	}
	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date()
	});
	note.save()
		.then(saved => {
			res.json(saved);
		})
		.catch(e => next(e));
});

app.put('/api/notes/:id', (req, res, next) => {
	const id = Number(req.params.id);
	const body = req.body;
	const noted = notes_arr.find(n => n.id === (id));
	const note = {
		content: body.content,
		important: body.important
	};

	if(noted){
		noted.content = body.content;
		noted.important = body.important;
		res.json(noted);
	}

	Note.findByIdAndUpdate(req.params.id, note, { new: true })
		.then(updated => {
			res.json(updated);
		})
		.catch(e => next(e));
});

const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted ID' });
	}else if (error.name === 'ValidationError') {
		return res.status(400).send({ error: error.message });
	}

	next(error);
};


app.use(unknownEndpoint);

// this has to be the last loaded middleware.
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const app = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   res.end(JSON.stringify(notes))
// });

// app.listen(PORT);
// console.log(`Server running on port ${PORT}`)