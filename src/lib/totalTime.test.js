import { totalTime } from ".";
import { testAgenda, fullAgenda } from "./totalTime.test.data";

describe("Totaling times", () => {
  it("Returns zero when nothing is sent", () => {
    expect(totalTime()).toEqual(0);
  });
  it("Gets the topic total from length", () => {
    expect(totalTime({ title: "install-vscode", length: 3 })).toEqual(3);
  });
  it("Totals an entire section", () => {
    expect(totalTime(testAgenda)).toEqual(60);
  });
  it("Totals an entire class", () => {
    expect(totalTime(fullAgenda)).toEqual(205);
  });
});
