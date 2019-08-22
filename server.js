const express = require('express');
const bodyParser = require('body-parser');
const {Person} = require('./db/Person');
const {mongoose} = require('./db/mongoose');

const app = express();
var port = process.env.PORT || 3100;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "X-Auth");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send('Hello world');
});
app.post('/signup', (req, res) => {
	var NewPerson = new Person({
		recordings: [],
		name: req.body.name,
		age: req.body.age,
		id: req.body.id
	});

	NewPerson.save().then((doc) => {
		res.send(doc);
	});
});
app.post('/recordings/:id', (req, res) => {
	const id = req.params.id;
	const recording = {weight:req.body.weight, date:req.body.date};

	Person.update(
		{ id }, 
		{ $push: { recordings: recording } },
		(doc) => {
			res.send(doc);
		}
	);
});	
app.get('/recordings/:id', (req, res) => {
	var id = req.params.id;

	Person.find({id}).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});
app.get('/persons', (req, res) => {
	Person.find().then(doc => {
		res.send(doc);
	});
});
app.delete('/persons', (req, res) => {
	Person.findOneAndDelete({_id:req.body.id}).then(doc => {
		res.send(doc);
	});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});