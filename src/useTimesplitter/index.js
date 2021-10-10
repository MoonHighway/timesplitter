import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import { totalTime } from "../lib";

async function refreshContent(url) {
  try {
    return await fetch(url).then((res) => res.json());
  } catch (error) {
    console.error(`An error occurred fetching content from ${url}`);
    throw error;
  }
}

function course(state, action = {}) {
  switch (action.type) {
    case "LOADED":
      return action.payload;
    default:
      return state;
  }
}

function loading(state = false, action = {}) {
  switch (action.type) {
    case "LOAD":
      return true;
    case "LOADED":
      return false;
    case "ERROR":
      return false;
    default:
      return state;
  }
}

function preview(state = true, action = {}) {
  switch (action.type) {
    case "START":
      return false;
    default:
      return state;
  }
}

function reducer(state = null, action = {}) {
  return {
    loading: loading(state.loading, action),
    preview: preview(state.preview, action),
    course: course(state.course, action),
  };
}

function createActions(dispatch = (f) => f, contentUrl) {
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

const TimesplitterContext = createContext();
export const useTimesplitter = () => useContext(TimesplitterContext);

export function TimesplitterProvider({
  defaultContent,
  contentUrl = "/content",
  children,
}) {
  const [{ loading, preview, course }, dispatch] = useReducer(reducer, {
    loading: true,
    preview: true,
    course: defaultContent,
  });

  const courseLength = useMemo(() => {
    console.log(course);
    if (!course) return 0;
    return totalTime(course);
  }, [course]);

  const actions = useMemo(() => createActions(dispatch, contentUrl), []);

  useEffect(() => {
    if (course) return;
    actions.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TimesplitterContext.Provider
      value={{
        ...course,
        loading,
        preview,
        courseLength,
        actions,
      }}
    >
      {children}
    </TimesplitterContext.Provider>
  );
}
