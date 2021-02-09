const mongoose = require("mongoose");

const BroadcastSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Stream must have a name"],
  },
});

const Broadcast = mongoose.model("Broadcast", BroadcastSchema);

module.exports = Broadcast;
