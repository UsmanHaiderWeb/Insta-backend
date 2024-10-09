const express = require('express');

const userModel = require('../models/user.model.js');
const postModel = require('../models/post.model.js');

const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const router = express();



router.post('/api/likepost', LoggedInVerificationByQuery, async (req, res) => {
    try {
        if (req.query.id != undefined && req.query.id != null && req.query.id != '') {
            let user = req.user;
            let post = await postModel.findOne({_id: req.query.id})
            let totalLikesOnPost;
            if (post) {
                if (!user.likedPosts.includes(post._id)) {
                    user.likedPosts.unshift(post._id)
                    await user.save();
                    post.likes.unshift(user._id)
                    await post.save();
                    totalLikesOnPost = post.likes.length;
                    res.status(200).json({message: "Post has been liked", isLiked: true, totalLikes: totalLikesOnPost})
                } else {
                    user.likedPosts.splice(user.likedPosts.indexOf(post._id), 1);
                    user.save()
                    post.likes.splice(post.likes.indexOf(user._id), 1);
                    post.save();
                    totalLikesOnPost = post.likes.length;
                    res.status(200).json({message: "Post has been unliked", isLiked: false, totalLikes: totalLikesOnPost})
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