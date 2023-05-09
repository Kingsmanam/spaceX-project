const {
  getLaunches,
  scheduleNewLaunch,
  islaunchExisted,
  abortLaunch,
} = require("../../models/launches.model");

async function httpGetLaunches(req, res) {
  return res.json(await getLaunches());
}

async function httpPostLaunch(req, res) {
  const launch = req.body;

  if (!launch.launchDate || !launch.mission || !launch.target || !launch.rocket) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: "missing required property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: "launchDate is invalid",
    });
  }
  try {
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
  } catch (err) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: err.message,
    });
  }
}

async function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;
  const existsLaunch = await islaunchExisted(launchId);

  if (!existsLaunch) {
    return res.status(404).json({
      status: 400,
      success: false,
      error: "launch not found",
    });
  }
  const aborted = await abortLaunch(launchId);
  return res.json(aborted);
}

module.exports = {
  httpGetLaunches,
  httpPostLaunch,
  httpAbortLaunch,
};
