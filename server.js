const express = require('express');
const app = express();

const pokemon = require("./models/pokemon.js");

//middleware
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

//route for every pokemon
app.get('/pokemon', function(req, res) {
    // console.log(pokemon);
    res.send(pokemon);
});   

//route for individual pokemon
app.get('/pokemon/:id', function(req, res) {
    let index = req.params.id;
    // console.log(index);
    res.send(pokemon[index]);
});

//index
app.get('/pokemon', function(req, res) {

    res.render('index.ejs', {pokemon: pokemon});
});   

app.listen(3000, () => {
    console.log('I am listening');
})