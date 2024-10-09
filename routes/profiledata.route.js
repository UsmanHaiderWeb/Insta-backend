const express = require('express');

const userModel = require('../models/user.model.js');
const postModel = require('../models/post.model.js');

const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const router = express();


router.get('/api/profiledata', LoggedInVerificationByQuery, async (req, res) => {
    try {
        let user = await userModel.findOne({_id: req.user._id}).select(["dp", "email"])
        res.status(200).json({message: "User data has ben sent.", user})
    } catch (err) {
        console.log("ERROR SEND PROFILE DATA: ", err.message)
        res.status(210).json({message: "Something went wrong."})
    }
})


module.exports = router;