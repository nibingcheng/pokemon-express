const express = require('express');
const app = express();
const methodOverride = require('method-override');

//middleware start
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));
app.use('/pokemon', require('./controllers/pokemonController'));
app.use('/users', require('./controllers/usersController'));
//middleware end


app.get('/', function(req, res) {
    res.redirect('/pokemon');
});   

app.listen(3000, () => {
    console.log('I am listening');
})