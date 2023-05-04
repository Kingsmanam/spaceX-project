const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "discovering universe",
  rocket: "kepler",
  launchDate: new Date("December 27, 2030"),
  customers: ["AlignTeam", "Nasa"],
  target: "kepler-224 b",
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function islaunchExisted(launchId) {
  return launches.has(launchId);
}

function getLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["AlignTeam", "Nasa"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunch(id) {
  const abortedLaunch = launches.get(id);
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
}

module.exports = { getLaunches, addNewLaunch, islaunchExisted, abortLaunch };
