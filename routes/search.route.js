const express = require('express');
const userModel = require('../models/user.model.js');

const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const getuserRandomly = require('../utils/getuserRandomly.js')
const router = express();


router.post('/api/search', LoggedInVerificationByQuery, async (req, res) => {
    try {
        if (req.query.search && req.query.search != ''){
            let search = req.query.search;
            let regex = new RegExp(`${search}`, 'i')
            let users = await userModel.find({username: regex}).select(['username', 'email', 'dp'])
            res.status(200).send({message: "Reels have been sent", users});
        } else {
            let randomUsers = await getuserRandomly(10);
            res.status(200).send({message: "Reels have been sent", users: randomUsers});
        }
    } catch (err) {
        console.log("SEARCHING FOR USERS FAILURE ERROR:=> ", err.message);
        res.status(210).send("Something went wrong.");
    }
})



module.exports = router;