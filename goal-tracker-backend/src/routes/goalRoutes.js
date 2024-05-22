const express = require('express');
const Goal = require('../models/Goal');
const router = new express.Router();
const auth = require('../middleware/auth');
const { ObjectID } = require('mongodb')

//list all goals for a user
router.get('/me', auth, async (req, res) => {
    try {
        const user_id = req.user._id;
        const goals = await Goal.find({ user_id });
        console.log('all fetched goals when user login-->>>', goals)
        res.send(goals);
    } catch (e) {
        console.log("error running")
        res.status(500).send('unable to fetch the goals');
    }
})

//create a goal
router.post('/create', auth, async (req, res) => {
    try {
        req.body.user_id = req.user._id;
        const goal = new Goal(req.body);
        console.log("gdhd", goal);
        await goal.save();
        console.log("goal sent is->>>", goal)
        res.status(201).send(goal);
    } catch (e) {
        console.log(e)
        res.status(400).send('unable to create goal')
    }
})

//update goal
router.patch('/update', auth, async (req, res) => {
    try {
        const goal = await Goal.findByIdAndUpdate(req.body._id, req.body, { new: true, runValidators: true });
        res.send(goal);
    } catch (e) {
        console.log(e)
        res.status(400).send("error while updating goal!!")
    }
})

//delete a goal
router.delete('/delete', auth, async (req, res) => {
    console.log("d req body---", req.body)
    try {
        await Goal.findByIdAndDelete(req.body._id);
        res.send();
    } catch (e) {
        res.status(500).send('error in deleting the goal')
    }
})

module.exports = router;