let express = require("express");
let path = require("path");
let favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let cors = require('cors')
let RateLimit = require('express-rate-limit')


let signup = require('./routes/signup')
let login = require('./routes/login')
let logout = require('./routes/logout')
let activate = require('./routes/activate')
let config  = require('./routes/config')
let index = require("./routes/index")
let resetPasswordHandler = require('./routes/resetPasswordHandler')
let resetPasswordEmail = require('./routes/resetPasswordEmail')
let protected = require('./routes/protected')


// passport imports
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let session = require('express-session')

// mongo imports
let mongodb = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
let {mongoose} = require('./db/mongoose');



let limiter = new RateLimit({
	windowMs: 15*60*1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	delayMs: 0 // disable delaying - full speed until the max limit is reached
  });
  


let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.cookieParserSecret));
app.use(express.static(path.join(__dirname, "public")));
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(limiter)


app.use('/', index)
app.use('/signup', signup)
app.use('/login', login)
app.use('/logout', logout)
app.use('/activate', activate)
app.use('/resetpasswordemail', resetPasswordEmail)
app.use('/resetpasswordhandler', resetPasswordHandler)
app.use('/protected', protected)

// passport initialize
let {User} = require('./db/models/UserSchema');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
