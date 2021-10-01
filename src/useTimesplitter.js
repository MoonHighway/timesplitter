import { createContext, useContext, useState, useEffect } from "react";

async function refreshContent(url) {
  try {
    return await fetch(url).then((res) => res.json());
  } catch (error) {
    console.error(`An error occurred fetching content from ${url}`);
    throw new Error(`An error occurred while loading /content`);
  }
}

const TimesplitterContext = createContext();
export const useTimesplitter = () => useContext(TimesplitterContext);

export function TimesplitterProvider({ contentUrl = "/content", children }) {
  const [content, setContent] = useState();
  let value = !content
    ? {
        loading: true,
        title: "",
        agenda: [],
      }
    : {
        loading: false,
        ...content,
      };

  useEffect(() => {
    if (content) return;
    refreshContent(contentUrl).then(setContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TimesplitterContext.Provider value={value}>
      {children}
    </TimesplitterContext.Provider>
  );
}
