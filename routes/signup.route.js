const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user.model.js');

const router = express();


router.post('/api/signup', async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            res.status(210).json({message: "Something went wrong"});
        } else {
            let {username, email, password, image} = req.body;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if(err){
                        console.log("SIGNUP ENCRYPTING PASSWORD ERROR: ", err.message);
                        res.status(210).json({message: "Something went wrong"})
                        return;
                    }
                    let createdUser = await userModel.create({
                        username,
                        email,
                        password: hash,
                        dp: image,
                    })
                    let token = await jwt.sign({id: createdUser._id}, "Hello! I am building Insta Clone.")
                    res.status(200).json({message: "User has been created", token})
                });
            })
        }
    } catch (error) {
        console.log("SIGNUP ERROR: ", error.message);
        res.status(210).json({message: "Something went wrong"})
    }
})



module.exports = router;