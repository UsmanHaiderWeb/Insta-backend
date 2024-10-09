const express = require('express');

const userModel = require('../models/user.model.js');
const postModel = require('../models/post.model.js');

const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const router = express();


router.get('/api/profile', LoggedInVerificationByQuery, async (req, res) => {
    try {
        let user = await userModel.findOne({_id: req.query.id}).select(["-password"]).populate(["posts", "savedPosts", {path: 'followers', select: '-password'}, {path: 'followings', select: '-password'}])
        
        if (user) {
            let loggedInUser = req.user;
            
            let editable = false;
            if ((user._id).toString() == (loggedInUser._id).toString()) {
                editable = true;
                res.status(200).json({message: "User data has been sent.", user, editable})
            } else {
                editable = false;
                let isFollowed = false;
                if (loggedInUser.followings.includes(user.id)) {
                    isFollowed = true;
                } else {
                    isFollowed = false;
                }
                res.status(200).json({message: "User data has been sent.", user, editable, isFollowed})
            }
        } else {
            res.status(210).json({message: "User does not exist", dataFound: false});
        }
    } catch (err) {
        console.log("ERROR SEND PROFILE DATA: ", err.message)
        res.status(210).json({message: "Something went wrong.", dataFound: false})
    }
})


module.exports = router;