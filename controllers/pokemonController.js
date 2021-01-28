const express = require('express');
const router = express.Router();
const pokemon = require("../models/pokemon.js");

//index
router.get('/', function(req, res) {
    res.render('index.ejs', {pokemon: pokemon});
});   

//show
router.get('/:id', function(req, res) {
    let index = req.params.id;
    res.render('show.ejs', {pokemon: pokemon[index]})
});


module.exports = router;