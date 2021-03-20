#! /usr/bin/env node
const path = require("path");
const express = require("express");
const { exec } = require("child_process");
const contentRoutes = require("./content-routes");
const app = express();
app.use("/content", contentRoutes);
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
  exec("open http://localhost:4224");
});
