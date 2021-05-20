import { useState, useEffect } from "react";
import { toJSON, toText, throwIt } from "./lib";
import { pickPrevious, pickNext } from "./lib/pick";

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

export function useContentLinks(path = []) {
  const content = useContent();

  if (!content) return [[{ title: "" }], [{ title: "" }]];

  let [pTopic, pRoute] = pickPrevious(content, ...path);
  let [nTopic, nRoute] = pickNext(content, ...path);

  if (!pTopic) {
    pTopic = { title: "Course Overview" };
    pRoute = "/overview";
  } else {
    pRoute = `/agenda/${pRoute}`;
  }
  if (!nTopic) {
    nTopic = { title: "End Course" };
    nRoute = "/end";
  } else {
    nRoute = `/agenda/${nRoute}`;
  }
  return [
    [pTopic, pRoute],
    [nTopic, nRoute],
  ];
}
