import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom";
import { useTimesplitter, TimesplitterProvider } from "..";

it("begins with preview state", () => {
  const testContent = { title: "Test Course", agenda: [] };
  const wrapper = ({ children }) => (
    <TimesplitterProvider defaultContent={testContent}>
      {children}
    </TimesplitterProvider>
  );
  const { result } = renderHook(() => useTimesplitter(), { wrapper });
  expect(result.current.preview).toEqual(true);
});

it("START action affects preview", async () => {
  const testContent = { title: "Test Course", agenda: [] };
  const wrapper = ({ children }) => (
    <TimesplitterProvider defaultContent={testContent}>
      {children}
    </TimesplitterProvider>
  );
  const { result } = renderHook(() => useTimesplitter(), {
    wrapper,
  });

  act(() => {
    result.current.actions.start();
  });

  expect(result.current.preview).toEqual(false);
});

it("END action affects preview", async () => {
  const testContent = { title: "Test Course", agenda: [] };
  const wrapper = ({ children }) => (
    <TimesplitterProvider defaultContent={testContent}>
      {children}
    </TimesplitterProvider>
  );
  const { result } = renderHook(() => useTimesplitter(), {
    wrapper,
  });

  act(() => {
    result.current.actions.end();
  });

  expect(result.current.preview).toEqual(true);
});
