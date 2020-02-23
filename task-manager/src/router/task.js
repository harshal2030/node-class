const express = require('express');
const Task = require('./../models/tasks')
const auth = require('./../middleware/auth')
const router = new express.Router()

router.get('/tasks', auth, async (req, res) => {

    try {
        task = await Task.find({owner: req.user._id})
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id',  auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.post('/tasks',  auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isAllowed = updates.every((update) => allowedUpdates.includes(update))

    if (!isAllowed) {
        return res.status(400).send({error: 'Bad update params'});
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        updates.forEach((update) => task[update] = req.body[update])
        await task.save();

        if (!task) {
            return res.status(404)
        }

        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;