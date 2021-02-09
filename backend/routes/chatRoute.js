const express = require("express");

const router = express.Router();

router.route('/').get((req, res, next) => {
  res.send(200).json({
    message: "Chat routes enabled",
  });
});

router.route("/:id").get((req, res, next) => {
  res.status(200).json({
    message: "Room ID created",
  });
});

module.exports = router;
