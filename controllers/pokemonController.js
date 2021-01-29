const express = require('express');
const router = express.Router();
const pokemon = require("../models/pokemon.js");

//index
router.get('/', function(req, res) {
    res.render('index.ejs', {pokemon: pokemon});
});   

//New
router.get('/new', (req,res) => {
    res.render('new.ejs');
})
//POST pokemon
router.post("/", (req,res)=>{
    pokemon.push(req.body);
    // console.log(req.body);
    res.redirect('/pokemon');
})

//Edit
router.get('/:index/edit', (req, res)=> {
    console.log(pokemon[req.params.index]);
	res.render(
		'edit.ejs', //render views/edit.ejs
		{ //pass in an object that contains
			pokemon: pokemon[req.params.index], 
			index: req.params.index 
		}
	);
});
//PUT
router.put('/:index', (req, res) => { 
    pokemon[req.params.index] = req.body; 
	res.redirect('/'); 
});

//show
router.get('/:id', function(req, res) {
    let index = req.params.id;
    res.render('show.ejs', {pokemon: pokemon[index]})
});

//delete
router.delete('/:index', (req, res)=>{
    pokemon.splice(req.params.index, 1);
    res.redirect('/');
})

module.exports = router;