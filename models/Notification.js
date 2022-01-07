const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: String,
    notifAction: String,
    origin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userDest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    groupDest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
