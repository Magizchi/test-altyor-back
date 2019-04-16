const mongoose = require('mongoose');

const CarteSchema = new mongoose.Schema({
	nom: { type: String, default: '' },
	prix: { type: String, default: '' },
	capacite: { type: String, default: '' },
	taille: { type: String, default: '' },
	description: { type: String, default: '' }
});

module.exports = mongoose.model('Carte', CarteSchema, 'carte');
