const express = require("express");
const router = express.Router();

// const users = require("../users");
const users = require('../models').User;
const Team = require('../models').Team;
const Pokemon = require('../models').Pokemon;

//Index 
router.get('/', (req, res) => {
    res.render('users/index.ejs');
})
//Signup
router.get('/signup', (req,res) => {
    // res.render('users/signup.ejs');
    Team.findAll().then((allTeams) => {
        res.render('users/signup.ejs', {     
            teams: allTeams,
        })
    }) 
})

router.post("/profile", (req,res)=>{
    // users.push(req.body);
    // let userIndex = users.length - 1;
    // res.redirect(`profile/${userIndex}`);
    const newUserInfo = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        teamId: req.body.team
    };
    users.create(newUserInfo).then((thisUser)=>{
        res.redirect('/users/profile/'+thisUser.id);
    })
})

// login
router.get('/login', (req,res) => {
    res.render('users/login.ejs');
})

router.post('/login', (req, res)=>{
    // let thisUser = users.findIndex((user)=>
    // user.username === req.body.username && user.password === req.body.password
    // )
    // res.redirect('/users/profile/'+thisUser)
    users.findOne({    
        where: {
        username: req.body.username, 
        password: req.body.password
        }        
    }).then((thisUser) => {           
        res.redirect('/users/profile/'+thisUser.id);
    });
})

// Edit
router.get('/profile/:index', (req, res)=> {
	// res.render('users/profile.ejs', {
    //     userInfo: users[req.params.index], 
    //     index: req.params.index 
    // });
    users.findByPk(req.params.index, {
        include: [{ model: Team}, {model: Pokemon}],
    }).then((userInfo)=> {        
        Team.findAll().then((allTeams) => {
            res.render('users/profile.ejs', {
                userInfo: userInfo, 
                // index: req.params.index,
                teams: allTeams,
            })
        }) 
    })
});

router.put('/profile/:index', (req, res) => { 
    // console.log('hello!', req.body, req.params.index);
    // users[req.params.index] = req.body;
    // let index = req.params.index;
	// res.redirect('/users/profile/'+index);
    const userNewInfo = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        teamId: req.body.team
    };
    users.update(userNewInfo, {
        where: {id: req.params.index },
        // returnin: true
    }).then((thisUser) => {
        res.redirect('/users/profile/'+req.params.index);
    }); 
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