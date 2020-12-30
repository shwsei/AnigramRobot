const express = require("express");
const bodyParser = require('body-parser');
const animeController = require("./animesController/animeController");
const app = express();
const model = require("./schema/index")
app.set('view engine','ejs');



app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use("/",animeController);


app.listen(8080,()=>console.log("Servidor funcionando!"));
