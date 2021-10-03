import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TimesplitterProvider } from "..";
import testData from "./data/small-course.json";

export const renderTimesplitter = (ui, data = testData) => {
  return render(
    <TimesplitterProvider defaultContent={data}>{ui}</TimesplitterProvider>
  );
};
