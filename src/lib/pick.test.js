import { pick } from "./pick";
import { deepData, shallowData } from "./pick.test.data";

describe("picking the first item in the course", () => {
  let topic, current, prev, next;

  beforeAll(() => {
    [topic, [prev, current, next]] = pick(shallowData);
  });

  it("picks correct topic", () =>
    expect(topic).toEqual({ title: "First Section" }));
  it("picks correct previous route", () => expect(prev).not.toBeDefined());
  it("picks the correct current route", () =>
    expect(current).toEqual("course-level/first-section"));
  it("picks Second Section for next", () =>
    expect(next).toEqual("course-level/second-section"));
});

// describe("picking the first last in the course");

// describe("picking the next sibling item");

// describe("picking the previous sibling item");

// describe("picking the next nested item");

// describe("picking the previous nested item");

// describe("picking the next nested sibling");

// describe("picking the previous nested sibling");
