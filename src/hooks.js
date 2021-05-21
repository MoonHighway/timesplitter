import { useState, useEffect } from "react";
import { toJSON, toText, throwIt } from "./lib";

export const useContent = () => {
  const [content, setContent] = useState();
  const url = "/content";
  useEffect(() => {
    if (content) return;
    fetch(url)
      .then(toJSON)
      .then(setContent)
      .catch(throwIt(`An error occurred while loading ${url}`));
  }, []);
  return content;
};

export const useContentFile = (path) => {
  const [content, setContent] = useState();
  const url = `/content${path}`;
  useEffect(() => {
    fetch(url)
      .then(toText)
      .then(setContent)
      .catch(throwIt(`An error occurred while loading ${url}`));
  }, [url]);
  return content;
};

export const usePresenter = (pathname) => {
  const topic = {
    id: "task-b",
    title: "task B",
    agenda: ["challenge-1", "challenge-2"],
    breadcrumbs: ["sample-course", "chapter-one", "step-one"],
    time: {
      length: 5,
      est: 5,
    },
  };
  const md = "## Markdown markdown \n\n\n This is a sample";
  const prev = { to: "/", text: "TODO: Next" };
  const next = { to: "/", text: "TODO: Prev" };

  return { md, topic, prev, next };
};
