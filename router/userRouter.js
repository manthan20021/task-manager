const express = require('express')
const router = express.Router()
const user = require('../models/user.model')
const {jwtAuthMidellwear, generateToken} = require('./../jwt')

router.post('/signup', async (req, res) => {
    try {

        const userR =  new user(req.body)
        const responce = await userR.save()

        const payload = {
            id: responce.id,
            username: responce.username
        }
         const token = generateToken(payload)
         console.log("token:", token);
         
        res.status(200).json({
            message: "user created successfully",
            responce: responce,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error
        })
        console.log(error);
        
    }
});



router.post('/login', async(req, res)=>{
    //Extract username password from req.body
    const {username, password} = req.body

    const person = await user.findOne({username: username})

    //chack user name and password
    if(!username || !(await person.comperPassword(password))){
        return res.status(401).json({error:"Invalid username password"})
    };

    const payload = {
        id: person.id,
        username: person.username
    };
   const token = generateToken(payload)
   res.json(token)

})

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