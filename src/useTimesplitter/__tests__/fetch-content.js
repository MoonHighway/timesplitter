import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom";
import { useTimesplitter, TimesplitterProvider } from "..";

const _fetch = global.fetch;
const fetchMock = (url) =>
  Promise.resolve({
    json: () => Promise.resolve({ title: "loading test sample" }),
  });

const testContent = { title: "Test Course", agenda: [] };
const wrapper = ({ children }) => (
  <TimesplitterProvider defaultContent={testContent}>
    {children}
  </TimesplitterProvider>
);

beforeAll(() => {
  global.fetch = fetchMock;
});
afterAll(() => {
  global.fetch = _fetch;
});

it("correct initial setup", () => {
  const { result } = renderHook(() => useTimesplitter(), {
    wrapper,
  });
  expect(result.current.loading).toEqual(false);
  expect(result.current.title).toEqual("Test Course");
});

it("refresh triggers loading", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useTimesplitter(), {
    wrapper,
  });

  act(() => {
    result.current.actions.refresh();
  });
  expect(result.current.loading).toEqual(true);
  await waitForNextUpdate();
});

it("fetches correct content", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useTimesplitter(), {
    wrapper,
  });
  act(() => {
    result.current.actions.refresh();
  });
  await waitForNextUpdate();
  expect(result.current.loading).toEqual(false);
  expect(result.current.title).toEqual("loading test sample");
});
