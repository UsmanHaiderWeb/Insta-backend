const express = require('express');

const userModel = require('../models/user.model.js');
const postModel = require('../models/post.model.js');
const commentModel = require('../models/comment.model.js');
const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');

const router = express();


router.post('/api/comment', LoggedInVerificationByQuery, async (req, res) => {
    try {
        if (req.query.id != undefined && req.query.id != '') {
            let post = await postModel.findOne({_id: req.query.id}).populate(["likes"])
            if (!post) {
                res.status(204).json({message: "Post not found"})
            } else {
                let comment = await commentModel.create({
                    commentAt: post._id,
                    commentBy: req.user._id,
                    commentDes: req.body.description
                })
                post.comments.unshift(comment._id);
                post.save();
                let allcomments = await commentModel.find({commentAt: post._id}).select(["commentAt", "commentDes"]).populate("commentBy");
                res.status(200).json({message: "Post has been sent", comments: allcomments.reverse()})
            }
        } else {
            res.status(210).json({message: "Something went wrong."})
        }
    } catch (error) {
        console.log("POSTING COMMENT ERROR: ", error.message);
        res.status(210).json({message: "Something went wrong."})
    }
})




module.exports = router;