const express = require("express");
const router = express.Router();

const users = require("../models/users");

router.get('/', (req, res) => {
    res.render('users/index.ejs');
})

router.get('/signup', (req,res) => {
    res.render('users/signup.ejs');
})

router.get('/login', (req,res) => {
    res.render('users/login.ejs');
})

router.post('/login', (req, res)=>{
    let thisUser = users.findIndex((user)=>
    user.username === req.body.username && user.password === req.body.password
    )
    res.redirect('/users/profile/'+thisUser)
})

router.post("/profile", (req,res)=>{
    
    users.push(req.body);
    // console.log(req.body);
    // console.log(users);
    let userIndex = users.length - 1;
    res.redirect(`profile/${userIndex}`);
})

router.get('/profile/:index', (req, res)=> {
	res.render('users/profile.ejs', {
        userInfo: users[req.params.index], 
        index: req.params.index 
    });
});

router.put('/profile/:index', (req, res) => { 
    users[req.params.index] = req.body;
    let index = req.params.index;
    // console.log(users);
	res.redirect('/users/profile/'+index); 
});

router.delete('/:index', (req, res)=>{
    users.splice(req.params.index, 1);
    // console.log(users);
    res.redirect('/users');
})

module.exports = router;