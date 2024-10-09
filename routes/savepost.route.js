const express = require('express');

const userModel = require('../models/user.model.js');
const postModel = require('../models/post.model.js');

const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const router = express();


router.post('/api/savepost', LoggedInVerificationByQuery, async (req, res) => {
    try {
        if (req.query.id != undefined && req.query.id != '') {
            let post = await postModel.findOne({_id: req.query.id}).populate(["createdBy", "likes", "comments"])
            if (post) {
                let user = req.user;
                if (!user.savedPosts.includes(post._id)) {
                    user.savedPosts.unshift(post._id)
                    await user.save();
                    post.savedBy.unshift(user._id)
                    await post.save();
                    res.status(200).json({message: "Post has been saved", isSaved: true})
                } else {
                    user.savedPosts.splice(user.savedPosts.indexOf(post._id), 1);
                    user.save();
                    post.savedBy.splice(post.savedBy.indexOf(user._id), 1);
                    post.save();
                    res.status(200).json({message: "Post has been unsaved.", isSaved: false})
                }
            } else {
                res.status(210).json({message: "Something went wrong."})
            }
        } else {
            res.status(210).json({message: "Something went wrong."})
        }
    } catch (error) {
        console.log("LIKE POST ERROR: ", error.message);
        res.status(210).json({message: "Something went wrong."})
    }
})


module.exports = router;