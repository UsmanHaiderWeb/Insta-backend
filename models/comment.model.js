const mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
    commentAt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentDes: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comments', commentSchema);