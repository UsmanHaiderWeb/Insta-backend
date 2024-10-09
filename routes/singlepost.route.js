const express = require('express');

const userModel = require('../models/user.model.js');
const postModel = require('../models/post.model.js');
const commentModel = require('../models/comment.model.js');

const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const router = express();


router.get('/api/getsinglepost', LoggedInVerificationByQuery, async (req, res) => {
    try {
        let post = await postModel.findOne({_id: req.query.id}).populate(["createdBy", "likes", "comments"])
            
        if (post) {
            let userToFollow = post.createdBy;
            let postComments = await commentModel.find({commentAt: post._id}).select(["commentAt", "commentDes"]).populate("commentBy");
            if (!post) {
                res.status(204).json({message: "Post not found"})
            } else {
                let user = req.user;
                let isSaved;
                if (user.savedPosts.includes(post._id)) {
                    isSaved = true;
                } else {
                    isSaved = false;
                }

                let isLiked;
                if (user.likedPosts.includes(post._id)) {
                    isLiked = true;
                } else {
                    isLiked = false;
                }

                let isFollowed;
                if ((user._id).toString() == (userToFollow._id).toString()) {
                    isFollowed = true;
                } else {
                    if (user.followings.includes(userToFollow._id)) {
                        isFollowed = true;
                    } else {
                        isFollowed = false;
                    }
                }
                res.status(200).json({message: "Post has been sent", post, postComments: postComments.reverse(), isSaved, isLiked, isFollowed})
            }
        } else {
            res.status(210).json({message: "Post does not exist.", dataFound: false})
        }
    } catch (err) {
        console.log("ERROR GETTING SINGLE POST: ", err.message)
        res.status(210).json({message: "Something went wrong.", dataFound: false})
    }
})


module.exports = router;