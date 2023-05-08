const http = require("http");
const app = require("./app");
const { loadAllPlanets } = require("./models/planets.model");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("mongoose connected ...");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const startServer = async () => {
  await mongoose.connect(process.env.CONNECTION_STRING, {
    authSource: "admin",
  });
  await loadAllPlanets();
  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

startServer();
