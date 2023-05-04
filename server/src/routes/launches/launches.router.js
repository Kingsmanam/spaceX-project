const express = require("express");
const { httpGetLaunches, httpPostLaunch } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetLaunches);
launchesRouter.post("/launches", httpPostLaunch);

module.exports = launchesRouter;
