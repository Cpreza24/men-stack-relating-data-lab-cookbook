const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user.js');

//INDEX
router.get('/', async (req, res) => {
    const users = await User.find();
    res.render('users/index.ejs', { users: users });
});

router.get('/:userId', async (req, res) => {
    try {
        const users = await User.findById(req.params.userId);
        res.render('users/show.ejs', { userPantry: users.pantry, user: users });
    } catch (error) {
        console.error(error.message);
        res.redirect('/');
    }
});

module.exports = router;
