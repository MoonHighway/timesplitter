import { useState, useEffect, useMemo } from "react";
import { toJSON, toText, throwIt, flattenCourse } from "./lib";

export const useContent = () => {
  const [content, setContent] = useState();
  const url = "/content";
  useEffect(() => {
    if (content) return;
    fetch(url)
      .then(toJSON)
      .then(setContent)
      .catch(throwIt(`An error occurred while loading ${url}`));

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const usePresenter = (path) => {
  const course = useContent();
  const flatCourse = useMemo(() => {
    if (!course) return;
    const [, ...topics] = flattenCourse(course);
    return topics;
  }, [course]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!flatCourse) return;
    const [topicName] = path.split("/").reverse();
    const contentIndex = flatCourse.map((t) => t.id).indexOf(topicName);
    setIndex(contentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatCourse]);

  if (!flatCourse) {
    return;
  }

  const topic = flatCourse[index];
  const md = "## Markdown markdown \n\n\n This is a sample";
  const prev = { to: "/", text: "TODO: Next" };
  const next = { to: "/", text: "TODO: Prev" };

  return { flatCourse, md, topic, prev, next };
};
