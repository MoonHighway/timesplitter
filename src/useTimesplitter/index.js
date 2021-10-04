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
  const [preview, setPreview] = useState(true);

  // Functions
  const actions = {
    refresh() {
      setLoading(true);
      refreshContent(contentUrl).then((data) => {
        setLoading(false);
        setContent(data);
      });
    },
    start() {
      setPreview(false);
    },
    end() {
      setPreview(true);
    },
  };

  let value = !content
    ? {
        title: "",
        agenda: [],
        loading,
        preview,
        actions,
      }
    : {
        ...content,
        loading,
        preview,
        actions,
      };

  useEffect(() => {
    if (content) return;
    actions.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TimesplitterContext.Provider value={value}>
      {children}
    </TimesplitterContext.Provider>
  );
}
