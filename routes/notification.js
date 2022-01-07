const express = require("express");
const mongoose = require("mongoose");

const Notification = require("../models/Notification");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (request, response) => {
  const notificationInfo = request.body;
  const notification = new Notification(notificationInfo);

  try {
      const savedNotification = await notification.save();
      console.log(savedNotification);
    response.status(201).send({notification: savedNotification});
} catch (error) {
    response.status(500).send({ error: error.message });
  }
});

router.get("/", auth, async (request, response) => {
    const groupID = request.query.group;
    let notifFilter = {};

    if (groupID) {
        notifFilter("groupDest") = groupID
    } else {
        notifFilter["userDest"] = request.user
    }

    try {
        const notifications = await Notification.find({
            ...notifFilter
        }).populate({
            path: "origin",
            select: ["username", "avatar"]
        }).populate({
            path: "groupDest",
            select: ["_id", "title"]
        }).populate({
            path: "question",
            select: ["_id", "title"]
        }).sort({ "createdAt": -1 })
        response.send({ notifications })
    } catch (error) {
        response.status(500).send({ error: error.message })
    }
})

module.exports = router;