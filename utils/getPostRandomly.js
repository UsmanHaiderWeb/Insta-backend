const express = require('express');
const postModel = require('../models/post.model.js');


async function getPostRandomly(count) {
    try {
        const randomUsers = await postModel.aggregate([
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

module.exports = getPostRandomly;