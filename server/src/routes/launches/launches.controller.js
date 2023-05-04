const { getLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetLaunches(req, res) {
  return res.json(getLaunches());
}

function httpPostLaunch(req, res) {
  const launch = req.body;
  if (!launch.launchDate || !launch.mission || !launch.destination || !launch.rocket) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: "missing required property",
    });
  }
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: "launchDate is invalid",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetLaunches,
  httpPostLaunch,
};
