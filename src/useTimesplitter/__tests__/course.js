import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom";
import { useTimesplitter, TimesplitterProvider } from "..";
import testCourse from "./data/main-sample.json";

it("correctly injects course data", () => {
  const testContent = { title: "Test Course", agenda: [] };
  const wrapper = ({ children }) => (
    <TimesplitterProvider defaultContent={testContent}>
      {children}
    </TimesplitterProvider>
  );
  const { result } = renderHook(() => useTimesplitter(), { wrapper });
  expect(result.current.title).toEqual("Test Course");
});

it("correctly schedules an on time course", () => {
  const wrapper = ({ children }) => (
    <TimesplitterProvider defaultContent={testCourse}>
      {children}
    </TimesplitterProvider>
  );
  const { result } = renderHook(() => useTimesplitter(), { wrapper });

  expect(result.current.agenda).toMatchSnapshot();

  act(() => {
    result.current.actions.adjust(0);
  });

  expect(result.current.agenda).toMatchSnapshot();

  //
  // [x] Before: topics should not have {time}
  // [ ] After: topics have {time}
  // [ ] After: {time} has est, scheduled
  // [ ] After: {time} schedules should be correct (snapshot??)
  //

  // await waitForNextUpdate();
});
