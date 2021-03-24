import { toJSON } from "./toJSON";

describe("toJSON", () => {
  it("calls .json() on the response", () => {
    const fn = jest.fn();
    toJSON({ json: fn });
    expect(fn).toBeCalledTimes(1);
  });
});
