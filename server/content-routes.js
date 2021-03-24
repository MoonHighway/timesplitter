const express = require("express");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const readFile = promisify(fs.readFile);

const router = express.Router();

module.exports = function (rootFolder) {
  router.get("/", async (req, res) => {
    let content = await readFile(
      path.join(rootFolder, "timesplitter.json"),
      "UTF-8"
    );

    try {
      content = JSON.parse(content);
    } catch (error) {
      let clearError = new Error(
        "There was an error parsing the timesplitter.json file"
      );
      console.error(clearError);
      throw error;
    }

    if (typeof content !== "object" || Array.isArray(content)) {
      throw new Error(
        "timesplitter.json must contain an object with a 'title' and 'agenda' fields"
      );
    }

    if (!content.title) {
      throw new Error("timesplitter.json must contain a 'title' field");
    }

    if (!content.agenda || !Array.isArray(content.agenda)) {
      throw new Error("timesplitter.json must contain an agenda array");
    }

    res.send(content);
  });

  router.get("/:topicName", async (req, res) => {
    const { topicName } = req.params;
    let fileName =
      topicName.toLowerCase() === "overview"
        ? path.join(rootFolder, "README.md")
        : topicName.toLowerCase() === "instructions"
        ? path.join(rootFolder, "INSTRUCTIONS.md")
        : path.join(__dirname, "../build/index.html");
    try {
      res.send(await readFile(fileName, "UTF-8"));
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get("/agenda/:fullPath*", async (req, res) => {
    const [, , ...p] = req.url.split("/");
    const filePath = path.join(rootFolder, p.join("/"));
    try {
      const content = await readFile(`${filePath}.md`, "UTF-8");
      res.send(content);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};
