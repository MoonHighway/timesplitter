async function refreshContent(url) {
  try {
    return await fetch(url).then((res) => res.json());
  } catch (error) {
    console.error(`An error occurred fetching content from ${url}`);
    throw error;
  }
}

export default function createActions(dispatch = (f) => f, contentUrl) {
  return {
    refresh() {
      dispatch({ type: "LOAD" });
      refreshContent(contentUrl).then((payload) => {
        dispatch({ type: "LOADED", payload });
      });
    },
    start() {
      dispatch({ type: "START" });
    },
    end() {
      dispatch({ type: "END" });
    },
    adjust(length) {
      dispatch({ type: "ADJUST", payload: { length } });
    },
  };
}
