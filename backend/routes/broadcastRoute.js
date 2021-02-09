const express = require("express");
const broadcastController = require("../controllers/broadcastController");

const router = express.Router();

router
  .route("/")
  .get(broadcastController.getAllBroadcasts)
  .post(broadcastController.createBroadcast);

router.route("/:broadcastId").get(broadcastController.getABroadcast);

module.exports = router;
 