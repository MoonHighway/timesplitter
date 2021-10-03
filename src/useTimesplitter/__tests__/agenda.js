import { renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom";
import { useTimesplitter, TimesplitterProvider } from "..";

describe("useTimesplitter - agenda state", () => {
  it("Injected Agenda Correct", () => {
    const testContent = {
      title: "Sample Course",
      agenda: [
        { title: "agenda one" },
        { title: "agenda two" },
        { title: "agenda three" },
      ],
    };
    const wrapper = ({ children }) => (
      <TimesplitterProvider defaultContent={testContent}>
        {children}
      </TimesplitterProvider>
    );
    const { result } = renderHook(() => useTimesplitter(), { wrapper });
    const { agenda } = result.current;
    expect(agenda).toEqual(testContent.agenda);
  });
});
