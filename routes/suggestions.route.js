const express = require('express');
const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const getuserRandomly = require('../utils/getuserRandomly.js');


const router = express();


router.get('/api/suggestions', LoggedInVerificationByQuery, async (req, res) => {
    try {
        let randomUsers = await getuserRandomly(10);
        res.status(200).json({message: "Suggestion for you: ", suggestedUsers: randomUsers})
    } catch (err) {
        console.log("GETTING SUGGESTIONS ERROR: ", err.message)
        res.status(210).json({message: "Something went wrong."})
    }
})


module.exports = router;