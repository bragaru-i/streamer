const express = require("express");

const router = express.Router();

router.route('/').get((req, res, next) => {
  res.send(200).json({
    message: "Chat routes enabled",
  });
});

router.route("/:room").get((req, res, next) => {

  const room = req.params.room
  res.status(200).json({
    message: "Room ID created",
    room
  });
});

module.exports = router;
