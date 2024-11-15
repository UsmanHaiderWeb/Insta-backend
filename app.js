var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');

const dbConnection = require('./config/db-connection.js');

let indexRouter = require('./routes/index');
let allPostsRouter = require('./routes/allPosts.route');
let commentRouter = require('./routes/comment.route');
let editRouter = require('./routes/edit.route');
let exploreRouter = require('./routes/explore.route');
let followRouter = require('./routes/follow.route');
let likeRouter = require('./routes/like.route');
let loginRouter = require('./routes/login.route');
let profileRouter = require('./routes/profile.route');
let profileDataRouter = require('./routes/profiledata.route');
let reelsRouter = require('./routes/reels.route');
let savedPostRouter = require('./routes/savepost.route');
let searchRouter = require('./routes/search.route');
let signupRouter = require('./routes/signup.route');
let singlePostRouter = require('./routes/singlepost.route');
let suggestionsRouter = require('./routes/suggestions.route');
let createPostRouter = require('./routes/create.route');

var app = express();

// Session middleware
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}));

// CORS middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

// Set view engine and middleware
app.set("view engine", "ejs");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
dotenv.config();

// Routes
app.get('/', (req, res) => {
    res.json("Welcome to Instagram by Usman Haider.")
})
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

// Export app to work with Vercel's serverless functions
module.exports = app;
