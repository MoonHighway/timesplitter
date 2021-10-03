import { renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom";
import { useTimesplitter, TimesplitterProvider } from "..";

describe("useTimesplitter - title state", () => {
  it("Injected Title Correct", () => {
    const testContent = { title: "Test Course", agenda: [] };
    const wrapper = ({ children }) => (
      <TimesplitterProvider defaultContent={testContent}>
        {children}
      </TimesplitterProvider>
    );
    const { result } = renderHook(() => useTimesplitter(), { wrapper });
    expect(result.current.title).toEqual("Test Course");
  });
});