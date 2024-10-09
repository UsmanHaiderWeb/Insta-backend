const express = require('express');


const userModel = require('../models/user.model.js');
const postModel = require('../models/post.model.js');
const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');

const router = express();



router.post('/api/createpost', LoggedInVerificationByQuery, async (req, res) => {
    try {
        if (req.verificationStatus) {
            console.log('req.body: ', req.body);
            let {title, description, isVideo, image} = req.body
            let createdPost = await postModel.create({
                createdBy: req.user._id,
                image,
                description,
                title,
                isVideo
            })
            req.user.posts.unshift(createdPost._id);
            req.user.save();
            res.status(200).json({message: "Post has been created successfully."})
        } else {
            res.status(210).json({message: "Something went wrong."})
        }
    } catch (err) {
        console.log('CREATING POST FAILUER ERROR: ', err);
        res.status(210).json({message: "Something went wrong."})
    }
})


module.exports = router;