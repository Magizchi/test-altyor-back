const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const Carte = require('./models/model');
// const MONGODB_URI = 'mongodb://heroku_l2ft4tzz:3b0b5m28k4qdkd6t55jg3n5tuo@ds147096.mlab.com:47096/heroku_l2ft4tzz';
const mongoose = require('mongoose');
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/Carte',
	{
		useNewUrlParser: true
	},
	{
		useNewUrlParser: true
	},
	function(err) {
		if (err) console.error('Could not connect to mongodb.');
	}
);

app.post('/create', async (req, res) => {
	try {
		if (
			!(
				req.body.nom === '' ||
				req.body.prix === '' ||
				req.body.taille === '' ||
				req.body.capacite === '' ||
				req.body.description === ''
			)
		) {
			const newCarte = new Carte({
				nom: req.body.nom,
				prix: req.body.prix,
				taille: req.body.taille,
				capacite: req.body.capacite,
				description: req.body.description
			});
			await newCarte.save();
			res.json({ newCarte });
		} else {
			return res.status(400).json({ error: 'Tous les champs doit être remplis' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.get('/', async (req, res) => {
	try {
		const carte = await Carte.find();
		res.json(carte);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// **Update**
app.post('/update', async (req, res) => {
	try {
		if (
			req.body.id &&
			!(
				req.body.nom === '' ||
				req.body.prix === '' ||
				req.body.taille === '' ||
				req.body.capacite === '' ||
				req.body.description === ''
			)
		) {
			const updateCarte = await Carte.findOne({ _id: req.body.id });
			(updateCarte.nom = req.body.nom),
				(updateCarte.prix = req.body.prix),
				(updateCarte.taille = req.body.taille),
				(updateCarte.capacite = req.body.capacite),
				(updateCarte.description = req.body.description);
			await updateCarte.save();
			res.json({ updateCarte });
		} else {
			return res.status(400).json({ error: 'Tous les champs doit être remplis' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// **Delete**
app.post('/delete', async (req, res) => {
	try {
		if (req.body.id) {
			const deleteCarte = await Carte.findOne({ _id: req.body.id });
			// Autre manière de trouver un document à partir d'un `id` :
			// const student = await Student.findById(req.body.id);
			await deleteCarte.remove();
			res.json({ deleteCarte });
		} else {
			res.status(400).json({ message: 'Missing id' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.listen(process.env.PORT || 3600, () => {
	console.log('Server started');
});
