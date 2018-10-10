var db = require("../models");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');


module.exports = function (app) {
    app.use(cookieParser());
    var randomNumber = Math.floor(Math.random() * 10976545678);
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
    app.use((req, res, next) => {
        console.log('req checker', req.cookies,req.session)
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('user_sid');
        }
        next();
    });


    // middleware function to check for logged-in users
    var sessionChecker = (req, res, next) => {
        if (req.session.user && req.cookies.user_sid) {
            res.redirect('/login');
        } else {
            next();
        }
    };


    // route for Home-Page
    app.get('/', sessionChecker, (req, res) => {
         // also set token as a cookie that browser can read
        res.redirect('/login');
    });


    // route for user signup
    app.route('/signup')
        .get(sessionChecker, (req, res) => {
            res.sendFile(__dirname + '/public/expenses.html');
        })
        .post((req, res) => {
            console.log("hello");
            //console.log(req.body);
            //console.log("create user");
            db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                uuid: randomNumber
            })
                .then(user => {
                    res.cookie("user", randomNumber, {expires: new Date(Date.now() + 999999999)});
                    req.session.user = user.dataValues;
                    res.send(req.session.user);
                })
                .catch(error => {
                    //console.log(error)
                    res.redirect('/expenses');
                });
        });


    // route for user Login
    app.route('/login')
        .get(sessionChecker, (req, res) => {
            res.sendFile(__dirname + '/../public/login.html');
        })
        .post((req, response) => {
             // also set token as a cookie that browser can read
      response.cookie("user", req.body.username, {expires: new Date(Date.now() + 999999999)});
      console.log(req.headers.cookie.match(/(?<=user=)[^ ;]*/)[0])
            //console.log(req.body);
            var username = req.body.username,
                password = req.body.password;

            db.User.findOne({ where: { username } }).then(function (user) {
                //console.log(user)
                if (user === null) {
                    response.send("No imput. Please try again.");

                } else {
                //console.log(user.dataValues.password)
                //bcrypt.compare("user_sid", function(err, res) {
                bcrypt.compare(password,user.dataValues.password, function(err, res) {
                    //console.log(res)
                 if (res !== true) {
                    response.send("Wrong Username/Password. Please try again.");
                } else {
                    req.session.user = user.dataValues;
                    response.send(req.session.user);
                }
            })
        }
            });
        });


    // route for user's dashboard
    app.get('/dashboard', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.sendFile(__dirname + '/public/dashboard.html');
        } else {
            res.redirect('/login');
        }
    });


    // route for user logout
    app.get('/logout', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });


    // route for handling 404 requests(unavailable routes)
    app.use(function (req, res, next) {
        res.status(404).send("Sorry can't find that!")
    });
}
