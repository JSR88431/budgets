
var db = require("../models");

module.exports = function (app) {

    app.post("/api/budget", function (req, res) {
        console.log(req.body);
        var uuid = req.headers.cookie.match(/(?<=user=)[^ ;]*/)[0];

        db.Budget.create({
            money: req.body.money,
            source: req.body.source,
            uuid: uuid
        }).then(function (dbBudget) {
            res.json(dbBudget);
        })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/api/budget", function (req, res) {
        db.Budget.findAll({}).then(function (dbBudget) {
            res.json(dbBudget);
        });
    });

    app.delete("/api/budget/:id", function (req, res) {
        db.Budget.destroy({
            where: {
                id: req.params.id,
                uuid:uuid
            }
        }).then(function (dbSum) {
            res.json(dbSum);
        });

    });
};
