const mongoose = require("mongoose");

const animeSchema = mongoose.Schema({
	name: String,
	description: String,
	genre: String,
	eps: Object,
	image: String,
	mal: String,
	idMal: String,
	type: String,
	year: String,
	
})

module.exports = animeSchema;