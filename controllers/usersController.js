const express = require("express");
const router = express.Router();

// const users = require("../users");
const users = require('../models').User;

//Index 
router.get('/', (req, res) => {
    res.render('users/index.ejs');
})
//Signup
router.get('/signup', (req,res) => {
    res.render('users/signup.ejs');
})

router.post("/profile", (req,res)=>{
    // users.push(req.body);
    // let userIndex = users.length - 1;
    // res.redirect(`profile/${userIndex}`);
    users.create(req.body).then((thisUser)=>{
        res.redirect('/users/profile/'+thisUser.id);
    })
})

// login
router.get('/login', (req,res) => {
    res.render('users/login.ejs');
})

router.post('/login', (req, res)=>{
    let thisUser = users.findIndex((user)=>
    user.username === req.body.username && user.password === req.body.password
    )
    res.redirect('/users/profile/'+thisUser)
})

// Edit
router.get('/profile/:index', (req, res)=> {
	// res.render('users/profile.ejs', {
    //     userInfo: users[req.params.index], 
    //     index: req.params.index 
    // });
    users.findByPk(req.params.index).then((userInfo)=> {
        res.render('users/profile.ejs', {
            userInfo: userInfo, 
            index: req.params.index
        }) 
    })
});

router.put('/profile/:index', (req, res) => { 
    users[req.params.index] = req.body;
    let index = req.params.index;
	res.redirect('/users/profile/'+index); 
});

// Delete
router.delete('/:id', (req, res)=>{
    // users.splice(req.params.index, 1);
    // res.redirect('/users');
    users.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect("/users"); //redirect back to index route
    });
})

module.exports = router;