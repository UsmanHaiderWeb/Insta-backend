var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');

const dbConnection = require('./config/db-connection.js')


let indexRouter = require('./routes/index')
let allPostsRouter = require('./routes/allPosts.route')
let commentRouter = require('./routes/comment.route')
let editRouter = require('./routes/edit.route')
let exploreRouter = require('./routes/explore.route')
let followRouter = require('./routes/follow.route')
let likeRouter = require('./routes/like.route')
let loginRouter = require('./routes/login.route')
let profileRouter = require('./routes/profile.route')
let profileDataRouter = require('./routes/profiledata.route')
let reelsRouter = require('./routes/reels.route')
let savedPostRouter = require('./routes/savepost.route')
let searchRouter = require('./routes/search.route')
let signupRouter = require('./routes/signup.route')
let singlePostRouter = require('./routes/singlepost.route')
let suggestionsRouter = require('./routes/suggestions.route')
let createPostRouter = require('./routes/create.route')


var app = express();


app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}))

app.use(cors({
    origin: '*',
    method: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true
}))

app.set("view express", "ejs")
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
dotenv.config();


try {
    app.use('/', indexRouter);
    app.use('/', allPostsRouter);
    app.use('/', commentRouter);
    app.use('/', editRouter);
    app.use('/', exploreRouter);
    app.use('/', followRouter);
    app.use('/', likeRouter);
    app.use('/', loginRouter);
    app.use('/', profileRouter);
    app.use('/', profileDataRouter);
    app.use('/', reelsRouter);
    app.use('/', savedPostRouter);
    app.use('/', searchRouter);
    app.use('/', signupRouter);
    app.use('/', singlePostRouter);
    app.use('/', suggestionsRouter);
    app.use('/', createPostRouter);
} catch (error) {
    console.log("ROUTES ARE NOT WORKING; ", error.message);
}



app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});