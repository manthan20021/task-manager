const express = require('express')
const router = express.Router()
const user = require('../models/user.model')

router.post('/user', async (req, res) => {
    try {

        const userR =  new user(req.body)
        await userR.save()
        res.status(201).json({
            message: "user created successfully",
            user: userR
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error
        })
    }
});

router.get('/user', async (req, res) => {
    try {
        const userData = await user.find();
        res.status(201).json(userData)
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error
        })
    }
})

module.exports = router