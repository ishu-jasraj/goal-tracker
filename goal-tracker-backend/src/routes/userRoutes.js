const express = require('express');
const router = new express.Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

//create user
router.post('/signup', async (req, res) => {
    try {
        const body = req.body;
        console.log("body----", body)
        //check for unique email
        const email = req.body.email;
        const isEmailPresent = await User.find({ email });
        console.log("isEmailPresent-->>>", isEmailPresent)
        if (isEmailPresent.length > 0) {
            return res.status(400).send('email already in use');
        }
        const user = new User(body);
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(401).send('error in creating user')
    }
})

//login user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const checkPassword = (user.password === req.body.password);
            if (checkPassword) {
                const { username, email, _id } = user;
                return res.status(200).send({ username, email, _id });
            }
            res.status(400).send('please enter with valid login credentials')
        }
    } catch (e) {
        res.status(401).send(e);
    }
})


module.exports = router;