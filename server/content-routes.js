const express = require("express");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const readFile = promisify(fs.readFile);

const router = express.Router();

router.get("/", async (req, res) => {
  let content = await readFile(
    path.join(process.cwd(), "timesplitter.json"),
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
  try {
    const mdx = await readFile(path.join(process.cwd(), "README.md"), "UTF-8");
    res.send(mdx);
  } catch (error) {
    res.status(500).send(err);
  }
});

module.exports = router;
