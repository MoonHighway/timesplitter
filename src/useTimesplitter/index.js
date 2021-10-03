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
  const [loading, setLoading] = useState(false);

  // Functions
  const refresh = () => {
    setLoading(true);
    refreshContent(contentUrl).then((data) => {
      setLoading(false);
      setContent(data);
    });
  };

  let value = !content
    ? {
        title: "",
        agenda: [],
        loading,
        refresh,
      }
    : {
        ...content,
        loading,
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
