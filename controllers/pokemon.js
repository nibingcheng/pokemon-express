const express = require('express');
const router = express.Router();
const pokemon = require("../models/pokemon.js");

//index
router.get('/', function(req, res) {
    res.render('index.ejs', {pokemon: pokemon});
});   


module.exports = router;