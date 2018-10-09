// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads login
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // cms route loads cms.html
  app.get("/expenses", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/expenses.html"));
  });

  // signup route loads signup
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

//   app.get("/welcome", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });

};
