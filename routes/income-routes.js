var db = require("../models");

module.exports = function(app) {

    app.post("/api/expenses", function(req, res) {
        console.log(req.body);
        db.Expenses.create({
          money: req.body.money,
          source: req.body.source
        }).then(function(dbExpenses) {
          res.json(dbExpenses);
        });
      });
  
  app.get("/api/expenses", function(req, res) {
    db.Expenses.findAll({}).then(function(dbExpenses) {
      res.json(dbExpenses);
    });
  });

  app.post("/api/expenses", function(req, res) {
    db.Expenses.create({
      money: req.body.money,
      source: req.body.source
    }).then(function(dbExpenses) {
      res.json(dbExpenses);
    })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.delete("/api/expenses/:id", function(req, res) {
    db.Expenses.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBudget) {
      res.json(dbBudget);
    });
  });
};