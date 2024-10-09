const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user.model.js');

async function LoggedInVerificationByQuery(req, res, next) {
    try {
        if (Object.keys(req.query).length != 0 && req.query.token != '') {
            let token = jwt.verify(req.query.token, "Hello! I am building Insta Clone.")
            let user = await userModel.findOne({_id: token.id});
            if (user) {
                req.user = user;
                req.verificationStatus = true;
            } else {
                req.verificationStatus = false;
            }
        } else {
            req.verificationStatus = false;
        }
    } catch (error) {
        console.log("LOGIN BY QUERY ERROR: ", error.message);
    }
    next();
}


module.exports = LoggedInVerificationByQuery;