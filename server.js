const express = require('express');
const app = express();

const pokemon = require("./models/pokemon.js");

//middleware
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

app.get('/pokemon', function(req, res) {
    console.log(pokemon);
    res.render('show.ejs', {pokemon: pokemon});
});   

app.listen(3000, () => {
    console.log('I am listening');
})