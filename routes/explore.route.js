const express = require('express');

const postModel = require('../models/post.model.js');
const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const getPostRandomly = require('../utils/getPostRandomly.js')
const router = express();



router.get('/api/explore', LoggedInVerificationByQuery, async (req, res) => {
    try {
        let isLoggedIn = req.verificationStatus;
        if (isLoggedIn) {
            let explorePosts = await getPostRandomly(50);
            res.status(200).json({message: "Posts have been sent", explorePosts})
        } else {
            res.status(210).json({message:"Something went wrong."})
        }
    } catch (error) {
        console.log("/API/ALLPOSTS SENDING POSTS ERROR: ", error.message);
        res.status(210).json({message:"Something went wrong.", isLoggedIn})
    }
})


module.exports = router;