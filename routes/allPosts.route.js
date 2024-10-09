const express = require('express');

const userModel = require('../models/user.model.js');
const postModel = require('../models/post.model.js');
const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');

const router = express();



router.get('/api/allposts', LoggedInVerificationByQuery, async (req, res) => {
    try {
        let isLoggedIn = req.verificationStatus;
        if (isLoggedIn) {
            let posts = await postModel.find();
            res.status(200).json({message: "Posts have been sent", isLoggedIn, posts})
        } else {
            res.status(210).json({message:"Something went wrong.", isLoggedIn})
        }
    } catch (error) {
        console.log("/API/ALLPOSTS SENDING POSTS ERROR: ", error.message);
        res.status(210).json({message:"Something went wrong.", isLoggedIn})
    }
})


module.exports = router;