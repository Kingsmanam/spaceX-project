const { planets } = require("../models/planets.model");

function getPlanets(req, res) {
  return res.json(planets);
}

module.exports = {
  getPlanets,
};
