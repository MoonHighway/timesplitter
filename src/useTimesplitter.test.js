import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useTimesplitter, TimesplitterProvider } from "./useTimesplitter";

//
// [x] Setup React Component Testing (Context)
// [ ] Test Context Hook
// [ ] Mock or inject Content for Testing
// [ ] Check Test Coverage (reasonable coverage)
//

const renderTimesplitter = (ui) => {
  return render(<TimesplitterProvider>{ui}</TimesplitterProvider>);
};

describe("useTimesplitter", () => {
  describe("INITIAL STATE", () => {
    let _payload;
    beforeAll(() => {
      const Consumer = () => {
        _payload = useTimesplitter();
        return null;
      };
      renderTimesplitter(<Consumer />);
    });
    it("loading", () => expect(_payload.loading).toEqual(true));
    it("title", () => expect(_payload.title).toEqual(""));
    it("agenda", () => expect(_payload.agenda).toEqual([]));
  });
});
