const mongoose = require("mongoose");

//création du model Argonaute

const Argonaute = mongoose.model("Argonaute", {
  name: String,
});

module.exports = Argonaute;
