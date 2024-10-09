const express = require('express');
const bcrypt = require('bcrypt');

const userModel = require('../models/user.model.js');
const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');

const router = express();




router.post('/api/editprofile', LoggedInVerificationByQuery, async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            res.status(210).json({message: "Something went wrong."})
        } else {
            let user = req.user;
            let { username, email, password, oldpassword, image } = req.body;
            bcrypt.compare(oldpassword, user.password, async (err, result) => {
                if (result) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, async (err, hash) => {
                            let updatedUser = await userModel.findOneAndUpdate({_id: user._id}, {
                                username,
                                email,
                                password: hash,
                                dp: image
                            });
                            res.status(200).json({message: "Changes have been saved"})
                        })
                    })
                } else {
                    res.status(210).json({message: "Old Password is incorrect."})
                }
            })
        }
    } catch (error) {
        console.log("EDITING PROFILE DATA ERROR: ", error.message);
        res.status(210).json({message: "Something went wrong."})
    }
})


module.exports = router;