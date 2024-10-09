const express = require('express');
const userModel = require('../models/user.model.js');



async function getuserRandomly(count) {
    try {
        const randomUsers = await userModel.aggregate([
            {
                $sample: {size: count}
            },
            {
                $project: {password: 0}
            }
        ])
        return randomUsers;
    } catch (err) {
        console.log("GETTING RANDOM USERS ERROR: ", err.message)
    }
}


module.exports = getuserRandomly;