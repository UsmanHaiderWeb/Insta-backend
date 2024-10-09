const express = require('express');

const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const router = express();


router.get('/api/r1', LoggedInVerificationByQuery, (req, res) => {
    try {
        let isLoggedIn = req.verificationStatus;
        if (isLoggedIn) {
            res.status(200).json({message: "Working", isLoggedIn: true})
        } else {
            res.status(210).json({message:"User is not LoggedIn.", isLoggedIn: false})
        }
    } catch (error) {
        console.log('/API/R1 ERROR: ', error.message);
        res.status(210).json({message:"User is not LoggedIn.", isLoggedIn: false})
    }
})


module.exports = router;