import { useState, useEffect } from "react";
import { toJSON } from "./lib";

export const useContent = () => {
  const [content, setContent] = useState();
  useEffect(() => {
    fetch("/content")
      .then(toJSON)
      .then(setContent)
      .catch((error) => {
        console.error("An error occurred while loading /content");
        throw error;
      });
  }, []);
  return content;
};
