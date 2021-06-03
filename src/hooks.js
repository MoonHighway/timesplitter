import { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const md = useContentFile(path);
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

  const prevTopic = index > 0 && flatCourse[index - 1];
  const nextTopic = index + 1 < flatCourse.length && flatCourse[index + 1];

  return {
    flatCourse,
    md,
    topic: flatCourse[index],
    prevTopic,
    nextTopic,
    prev() {
      const prevIndex = index - 1;
      if (prevIndex < 0) return;
      const prevTopic = flatCourse[prevIndex];
      const [, ...bread] = prevTopic.breadcrumbs;
      const route = ["agenda", ...bread, prevTopic.id].join("/");
      setIndex(prevIndex);
      history.push(`/${route}`);
    },
    next() {
      const nextIndex = index + 1;
      if (nextIndex >= flatCourse.length) return;
      const nextTopic = flatCourse[nextIndex];
      const [, ...bread] = nextTopic.breadcrumbs;
      const route = ["agenda", ...bread, nextTopic.id].join("/");
      setIndex(nextIndex);
      history.push(`/${route}`);
    },
  };
};
