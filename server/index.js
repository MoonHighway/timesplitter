#! /usr/bin/env node

const path = require("path");
const express = require("express");
const { exec } = require("child_process");
const contentRoutes = require("./content-routes");

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/content", contentRoutes);

app.listen(4224, () => {
  console.log(`
  
  Moon Highway Course Runner 
  http://localhost:4224
  
  `);
  exec("open http://localhost:4224");
});
