const express = require('express');
const Goal = require('../models/Goal');
const router = new express.Router();

//create a goal
router.post('/create', async (req, res) => {
    try {
        const goal = new Goal(req.body);
        await goal.save();
        console.log("goal sent is->>>", goal)
        res.status(201).send(goal);
    } catch (e) {
        console.log(e)
        res.status(400).send('unable to create goal')
    }
})

module.exports = router;