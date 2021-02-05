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
    pokemon.create(req.body).then((newPokemon) => {
        res.redirect('/pokemon');
    })
})

//Edit
router.get('/:id/edit', (req, res)=> {
    pokemon.findByPk(req.params.id).then((pokemon) => {
	    res.render('edit.ejs', { 
			pokemon: pokemon,  
		});
    });
})

//PUT i.e. update
router.put('/:id', (req, res) => { 
    pokemon.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    }).then((pokemon) => {
        res.redirect("/pokemon");
    });
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