const adminModel = require('../models/AdminModel')
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const auth = require('../auth.js')

//register
router.post('/api/v1/register', async(req,res)=>{
    try{
        const {username, password} = req.body

        if(!(username && password)){
            res.status(500).send("Missing Input")
        }

        // check if user exists

        const prevUser = await adminModel.findOne({username})

        if(prevUser){
            return res.status(409).send("User Already Exists, Please Sign In")
        }

        //password encryption
        encprytPass = await bcrypt.hash(password, 10)

        const admin = await adminModel.create({
            username: username.toLowerCase(),
            password: encprytPass
        })

        const token = jwt.sign(
            {admin_id: admin._id, username},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )
        admin.token = token

        res.status(201).json(admin)
    }catch(err){
        console.log(err)
    }
})


//login
router.post('/api/v1/login', async(req,res) => {
    try{
        const {username, password} = req.body

        if(!(username, password)){
            res.status(400).send("Missing Input")
        }

        const admin = await adminModel.findOne({username})

        if(admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign(
                {admin_id: admin._id, username},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )

            admin.token = token;

        res.status(200).json(admin)
        return
        }

        res.status(400).send("Username or Password is Incorrect")
    }catch(err){
        console.log(err)
    }
})


router.post('/api/v1/welcome', auth, (req,res) => {
    res.status(200).send("Welcome!!!!!")
})

module.exports = router