const db = require("../models");
const mongoose = require("mongoose");

module.exports = {
    create: function (req, res) {
        console.log(req.body);
        console.log(req.params);
        res.send(req.status);
    }
}