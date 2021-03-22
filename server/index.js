#! /usr/bin/env node
const path = require("path");
const express = require("express");
const { exec } = require("child_process");
const contentRoutes = require("./content-routes");
const app = express();
let [command, , rootFolder] = process.argv;
rootFolder = rootFolder
  ? path.resolve(process.cwd(), rootFolder)
  : path.resolve(process.cwd());
app.use("/content", contentRoutes(rootFolder));
app.use(express.static(path.join(__dirname, "..", "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
app.listen(4224, () => {
  console.log(`

  ⏰ Timesplitter
  http://localhost:4224

  `);

  if (process.env.NODE_ENV !== "development") {
    exec("open http://localhost:4224");
  }
});
