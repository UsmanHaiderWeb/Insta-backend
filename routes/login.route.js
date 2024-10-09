const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userModel = require('../models/user.model.js');
const router = express();



router.post('/api/login', async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            res.status(210).json({message: "Something went wrong."})
        } else {
            let {email, password} = req.body;
            const user = await userModel.findOne({email})
            if (user == null) {
                res.status(210).json({message: "User doesn't exist."})
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        let token = jwt.sign({id: user._id}, "Hello! I am building Insta Clone.")
                        res.status(200).json({message: "User has been loggedIn", token})
                    } else {
                        res.status(210).json({message: "Email or password is wrong."})
                    }
                })
            }
        }
    } catch (error) {
        console.log("LOGIN ERROR: ", error.message);
        res.status(210).json({message: "Email or password is wrong."})
    }
})



// MONGODB_URL="mongodb://usmanhaiderweb2005:uWi3SXgqdSHezeHW@instagram-shard-00-00.0jhzd.mongodb.net:27017,instagram-shard-00-01.0jhzd.mongodb.net:27017,instagram-shard-00-02.0jhzd.mongodb.net:27017/?replicaSet=atlas-8cyawu-shard-0&ssl=true&authSource=admin"
// mongodb+srv://usmanhaiderweb2005:<db_password>@instagram.0jhzd.mongodb.net/
// MONGODB_PASSWORD=uWi3SXgqdSHezeHW


module.exports = router;