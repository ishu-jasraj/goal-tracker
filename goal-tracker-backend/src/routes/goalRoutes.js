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

//update goal
router.patch('/update', async (req, res) => {
    try {
        console.log("update body-->", req.body)
        const goal = await Goal.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true });
        res.send(goal);
    } catch (e) {
        res.status(400).send("error while updating goal!!")
    }
})

module.exports = router;