var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var db = require('./models');

// invoke an instance of express application.
var app = express();

// set our application port
app.set('port', 9001);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));
app.use(express.static("public"));
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

require("./routes/html-routes.js")(app);
require("./routes/expenses-routes.js")(app);
require("./routes/user-routes.js")(app);


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.

// start the express server
db.sequelize.sync({ force: true }).then(function() {
    app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
});