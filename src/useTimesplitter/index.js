import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import reducer from "./reducer";
import createActions from "./actions";
import { totalTime } from "../lib";

const TimesplitterContext = createContext();
export const useTimesplitter = () => useContext(TimesplitterContext);

export function TimesplitterProvider({
  defaultContent,
  contentUrl = "/content",
  children,
}) {
  const [{ loading, preview, course }, dispatch] = useReducer(reducer, {
    loading: false,
    preview: true,
    course: defaultContent,
  });

  const courseLength = useMemo(() => {
    if (!course) return 0;
    return totalTime(course);
  }, [course]);

  const actions = useMemo(() => createActions(dispatch, contentUrl), []);

  useEffect(() => {
    if (course) return;
    actions.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      actions.adjust(0, new Date().getTime());
    }, 500);

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
