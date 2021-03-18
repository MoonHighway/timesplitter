import { useState, useEffect } from "react";
import { toJSON, returnLocalSampleContent } from "./lib";

export const useContent = () => {
  const [content, setContent] = useState();
  useEffect(() => {
    fetch("/content")
      .then(toJSON)
      .then(setContent)
      .catch(returnLocalSampleContent(setContent));
  }, []);
  return content;
};
