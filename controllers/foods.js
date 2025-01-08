const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res) => {
    res.render('foods/index.ejs');
});

//INDEX
router.get('/foods', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', { pantry: currentUser.pantry });
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

//DELETE
router.delete('/foods/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.itemId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error.message);
        res.redirect('/');
    }
});
//CREATE
router.post('/foods', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error.message);
        res.redirect('/');
    }
});

module.exports = router;
