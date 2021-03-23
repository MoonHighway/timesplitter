import { useState, useEffect } from "react";
import { toJSON } from "./lib";

export const useContent = (contentPath = "") => {
  const [content, setContent] = useState(contentPath);
  useEffect(() => {
    fetch(`/content${contentPath}`)
      .then(toJSON)
      .then(setContent)
      .catch((error) => {
        console.error("An error occurred while loading /content");
        throw error;
      });
  }, []);
  return content;
};
