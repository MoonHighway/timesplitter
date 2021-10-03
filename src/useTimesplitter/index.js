import { createContext, useContext, useState, useEffect } from "react";

async function refreshContent(url, beforeRefresh, refreshComplete) {
  try {
    return await fetch(url).then((res) => res.json());
  } catch (error) {
    console.error(`An error occurred fetching content from ${url}`);
    throw new Error(`An error occurred while loading /content`);
  }
}

const TimesplitterContext = createContext();
export const useTimesplitter = () => useContext(TimesplitterContext);

export function TimesplitterProvider({
  defaultContent,
  contentUrl = "/content",
  children,
}) {
  // Hooks
  const [content, setContent] = useState(defaultContent);

  // Functions
  const refresh = () => refreshContent(contentUrl).then(setContent);

  let value = !content
    ? {
        loading: true,
        title: "",
        agenda: [],
        refresh,
      }
    : {
        loading: false,
        ...content,
        refresh,
      };

  useEffect(() => {
    if (content) return;
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TimesplitterContext.Provider value={value}>
      {children}
    </TimesplitterContext.Provider>
  );
}
