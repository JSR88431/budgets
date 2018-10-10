var db = require("../models");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');


module.exports = function (app) {
    app.use(cookieParser());
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
        res.redirect('/login');
    });


    // route for user signup
    app.route('/expenses')
        .get(sessionChecker, (req, res) => {
            res.sendFile(__dirname + '/public/expenses.html');
        })
        .post((req, res) => {
            //console.log(req.body);
            //console.log("create user");
            db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
                .then(user => {
                    req.session.user = user.dataValues;
                    res.redirect('/expenses');
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
            //console.log(req.body);
            var username = req.body.username,
                password = req.body.password;

            db.User.findOne({ where: { username: username } }).then(function (user) {
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
                    response.redirect('/expenses');
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
