const launchesMongo = require("./launches.mongo");
const planetsMongo = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "discovering universe",
  rocket: "kepler",
  launchDate: new Date("December 27, 2030"),
  customers: ["AlignTeam", "Nasa"],
  target: "Kepler-452 b",
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function saveLaunch(launch) {
  const habitablePlanets = await planetsMongo.findOne({
    keplerName: launch.target,
  });

  if (!habitablePlanets) {
    throw new Error("planet doesnt exist");
  }

  await launchesMongo.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function islaunchExisted(launchId) {
  return await launchesMongo.findOne({
    flightNumber: launchId,
  });
}

async function getLaunches() {
  return await launchesMongo.find({}, "-__v -_id");
}

async function getLatestFLightNumber() {
  const latestLaunch = await launchesMongo.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFLightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ["AlignTeam", "Nasa"],
    upcoming: true,
    success: true,
  });
  await saveLaunch(newLaunch);
}

async function abortLaunch(id) {
  const abortedLaunch = await launchesMongo.findOneAndUpdate(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    },
    {
      new: true,
    }
  );
  return abortedLaunch;
}

module.exports = { getLaunches, scheduleNewLaunch, islaunchExisted, abortLaunch };
