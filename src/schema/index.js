const mongoose = require("mongoose");
const Schema = require("./Anime")

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true });
// .env com a string de conexão com o mongo

mongoose.model("animes", Schema);

const model = mongoose.model("animes");
module.exports = model;