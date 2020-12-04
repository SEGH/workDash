const db = require("../models");
const mongoose = require("mongoose");

module.exports = {
    create: function (req, res) {
        console.log(`requestBody: ${req.body}`);
        console.log(req.params);
        db.Event
            .create({
                title: req.body.title,
                start: req.body.start,
                end: req.body.end,
                color: req.body.color,
                actions: req.body.actions,
                draggable: req.body.draggable,
                resizeable: req.body.resizeable
            })
            .then(event => {
                console.log(event);
                db.User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.userId) }, { $push: { events: event }})
                    .then(user => {
                        console.log(user);
                        res.json(user);
                    })
                    .catch(err => {
                        res.status(422).json(err);
                    });
            })
            .catch(err => res.status(422).json(err));
    },
    getAll: function (req, res) {
        db.User
            .findById({ _id: req.params.userId })
            .populate({
                path: "events"
            })
            .then(events => res.json(events))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        // console.log(req.params.eventId);
        db.Event
            .findById({ _id: mongoose.Types.ObjectId(req.params.eventId) })
            .then(event => event.remove())
            .then(event => {
                db.User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.userId) }, { $pull: { events: req.params.eventId }})
                    .then(user => {
                        res.json(user);
                    })
                    .catch(err => {
                        res.status(422).json(err);
                    });
            })
            .catch(err => res.status(422).json(err));
    }
}