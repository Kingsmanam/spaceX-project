const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
const loadAllPlanets = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await saveAllPlanets(data);
        }
      })
      .on("error", (err) => {
        reject(err);
        console.log(err);
      })
      .on("end", async () => {
        resolve();
        const planetsCount = (await getAllPlanets()).length;
        console.log(`${planetsCount} habitable planets found!`);
      });
  });
};

async function getAllPlanets() {
  return await planets.find({}, "-__v -_id");
}

async function saveAllPlanets(planet) {
  try {
    return await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`cannot save planet ${error}`);
  }
}

module.exports = {
  getAllPlanets,
  loadAllPlanets,
};
