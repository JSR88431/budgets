
var db = require("../models");

module.exports = function (app) {

    app.post("/api/expenses", function (req, res) {
        console.log(req.body);
        var uuid = req.headers.cookie.match(/(?<=user=)[^ ;]*/)[0];

        db.Expenses.create({
            money: req.body.amount,
            source: req.body.description,
            uuid: uuid
        }).then(function (dbExpenses) {
            res.json(dbExpenses);
        })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/api/expenses", function (req, res) {
        db.Expenses.findAll({}).then(function (dbExpenses) {
            res.json(dbExpenses);
        });
    });

    app.delete("/api/expenses/:id", function (req, res) {
        db.Expenses.destroy({
            where: {
                id: req.params.id,
                uuid:uuid
            }
        }).then(function (dbSum) {
            res.json(dbSum);
        });

    });
};
