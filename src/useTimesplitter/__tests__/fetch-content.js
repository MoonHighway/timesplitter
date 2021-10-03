import { renderHook, act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom";
import { useTimesplitter, TimesplitterProvider } from "..";

const _fetch = global.fetch;
const fetchMock = (url) =>
  Promise.resolve({
    json: () => Promise.resolve({ title: "loading test sample" }),
  });

describe("useTimesplitter - loading and refresh", () => {
  beforeAll(() => {
    global.fetch = fetchMock;
  });
  afterAll(() => {
    global.fetch = _fetch;
  });
  it("Learning ASYNC test", async () => {
    const testContent = { title: "Test Course", agenda: [] };
    const wrapper = ({ children }) => (
      <TimesplitterProvider defaultContent={testContent}>
        {children}
      </TimesplitterProvider>
    );
    const { result, waitForNextUpdate } = renderHook(() => useTimesplitter(), {
      wrapper,
    });

    expect(result.current.loading).toEqual(false);
    expect(result.current.title).toEqual("Test Course");
    act(() => {
      result.current.refresh();
    });
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();
    expect(result.current.loading).toEqual(false);
    expect(result.current.title).toEqual("loading test sample");
  });
});
