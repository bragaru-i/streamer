const app = require("../app");
const catchAsync = require("../utils/catchAsync");
const Broadcast = require("../model/broadcastModel");

exports.getAllBroadcasts = catchAsync(async (req, res, next) => {
  const broadcasts = await Broadcast.find();

  res.status(200).json({
    data: broadcasts,
    results: broadcasts.length,
  });
});

exports.getABroadcast = catchAsync(async (req, res, next) => {
  const { broadcastId } = req.params;
  const broadcast = await Broadcast.findById(broadcastId);
  if (!broadcast)
    return next(new AppError("No broadcasts to show on that id", 400));
  res.status(200).json({
    data: broadcast,
  });
});
exports.createBroadcast = catchAsync(async (req, res, next) => {
  const broadcast = await Broadcast.create(req.body);
  res.status(201).json({
    data: broadcast,
  });
});
exports.deleteBroadcast = catchAsync(async (req, res, next) => {
  const broadcast = await Broadcast.create(req.body);
  res.status(201).json({
    data: broadcast,
  });
});
