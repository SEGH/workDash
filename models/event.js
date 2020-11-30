const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String },
    start: { type: Date },
    end: { type: Date },
    color: { },
    actions: [],
    draggable: { type: Boolean},
    resizable: {}
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;