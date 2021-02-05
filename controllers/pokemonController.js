const express = require('express');
const router = express.Router();

// const pokemon = require("../pokemon.js");  
const pokemon = require("../models").Pokemon;

//index
router.get('/', function(req, res) {
    pokemon.findAll().then((pokemon) => {
        res.render('index.ejs', {
            pokemon: pokemon
        });
    })
});   

//New
router.get('/new', (req,res) => {
    res.render('new.ejs');
})
//POST i.e. create 
router.post("/", (req,res)=>{
    pokemon.push(req.body);
    // console.log(req.body);
    res.redirect('/pokemon');
})

//Edit
router.get('/:index/edit', (req, res)=> {
    // console.log(pokemon[req.params.index]);
	res.render(
		'edit.ejs', //render views/edit.ejs
		{ //pass in an object that contains
			pokemon: pokemon[req.params.index], 
			index: req.params.index 
		}
	);
});
//PUT i.e. update
router.put('/:index', (req, res) => { 
    pokemon[req.params.index] = req.body; 
	res.redirect('/'); 
});

//show
router.get('/:id', function(req, res) {
    let id = req.params.id;
    pokemon.findByPk(id).then((pokemon) => {
        res.render('show.ejs', {
            pokemon: pokemon,
        })
    });
});

//delete
router.delete("/:id", (req, res) => {
    pokemon.destroy({ where: { id: req.params.id } }).then(() => {
      res.redirect("/pokemon");
    });
});


module.exports = router;