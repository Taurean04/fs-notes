const mongoose = require('mongoose');


if(process.argv.length < 3){
	console.log('Please provide the password as an argument: node mongo.js <password>');
	process.exit(1);
}


const password = process.argv[2];

const url = `mongodb+srv://Taurean:${password}@cluster0.1ud5r.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url).catch(e => console.log(e));

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

Note.find({ important: true }).then(res => {
	res.forEach(note => {
		console.log(note);
	});
	mongoose.connection.close();
});

// const note = new Note({
//     content: 'Callback-functions suck',
//     date: new Date(),
//     important: true
// });

// note.save().then(res => {
//     console.log('note saved!');
//     mongoose.connection.close();
// });