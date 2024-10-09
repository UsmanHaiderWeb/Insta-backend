const express = require('express');
const postModel = require('../models/post.model.js');

const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const router = express();

router.get('/api/reels', LoggedInVerificationByQuery, async (req, res) => {
    try {
        let reels = await postModel.find({isVideo: true})
        res.status(200).send({message: "Reels have been sent", reels});
    } catch (err) {
        console.log("SENDING REELS FAILURE ERROR:=> ", err.message);
        res.status(210).send("Something went wrong.");
    }
})



module.exports = router;