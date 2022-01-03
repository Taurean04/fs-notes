const notesRouter = require('express').Router();
const Note = require('./models/note');


notesRouter.get('/', (req, res) => {
	Note.find({})
		.then(notes => {
			res.json(notes);
		});
});

notesRouter.get('/:id', (req, res, next) => {
	Note.findById(req.params.id)
		.then(note => {
			if(!note){
				res.status(404).end();
			}
			res.json(note);
		}).catch(e => next(e));
});
notesRouter.delete('/:id', (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
		.then(result => {
			console.log(result);
			res.status(204).end();
		})
		.catch(e => next(e));
});

notesRouter.post('/', (req, res, next) => {
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

notesRouter.put('/:id', (req, res, next) => {
	const body = req.body;
	const note = {
		content: body.content,
		important: body.important
	};

	Note.findByIdAndUpdate(req.params.id, note, { new: true })
		.then(updated => {
			res.json(updated);
		})
		.catch(e => next(e));
});

module.exports = notesRouter;