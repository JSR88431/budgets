var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var db = require('./models');

// invoke an instance of express application.
var app = express();
var PORT = process.env.PORT || 9001
// set our application port
// app.set('port', 9001);

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
require("./routes/income-routes.js")(app);

require("./routes/user-routes.js")(app);




// start the express server
<<<<<<< HEAD
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, () => console.log(`App started on port ${PORT}`));
=======
db.sequelize.sync({ force: false }).then(function() {
    app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
>>>>>>> budget
});