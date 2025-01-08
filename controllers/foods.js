const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res) => {
    res.render('foods/index.ejs');
});

//INDEX
router.get('/foods', (req, res) => {
    try {
        res.render('foods/index.ejs');
    } catch (error) {
        console.error(error.message, { message: 'server error' });
    }
});

//NEW
router.get('/foods/new', async (req, res) => {
    try {
        res.render('foods/new.ejs');
    } catch (error) {
        console.error(error.message, { message: 'server error' });
    }
});

module.exports = router;
