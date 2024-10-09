const express = require('express');
const userModel = require('../models/user.model.js');

const LoggedInVerificationByQuery = require('../utils/LoggedInVerificationByQuery.js');
const router = express();


router.post('/api/follow', LoggedInVerificationByQuery, async (req, res) => {
    try {
        if (req.query.id != undefined && req.query.id != null && req.query.id != '') {
            let user = req.user;
            let userToFollow = await userModel.findOne({_id: req.query.id}).select("-password").populate([
                {path: 'followers', select: "-password"},
                {path: 'followings', select: "-password"}
            ]);
            if (userToFollow) {
                if ((user._id).toString() != (userToFollow._id).toString()) {
                    if (!user.followings.includes(userToFollow._id) && !userToFollow.followers.includes(user._id)) {
                        user.followings.unshift(userToFollow._id);
                        await user.save();
                        userToFollow.followers.unshift(user._id);
                        await userToFollow.save();
                        res.status(200).json({message: "You follow this user.", isFollowed: true, totalFollowers: userToFollow.followers, totalFollowings: userToFollow.followings})
                    } else {
                        user.followings.splice(user.followings.indexOf(userToFollow._id), 1);
                        await user.save();
                        userToFollow.followers.splice(userToFollow.followers.indexOf(user._id), 1);
                        await userToFollow.save();
                        res.status(200).json({message: "You unfollowed this user.", isFollowed: false, totalFollowers: userToFollow.followers, totalFollowings: userToFollow.followings});
                    }
                } else {
                    res.status(200).json({message: "You created this post.", isFollowed: true})
                }
            } else {
                res.status(210).json({message: "User does not exist."})
            }
        } else {
            res.status(210).json({message: " User ID is wrong."})
        }
    } catch (error) {
        console.log("FOLLOW USER ERROR: ", error.message);
        res.status(210).json({message: "Something went wrong."})
    }
})


module.exports = router;