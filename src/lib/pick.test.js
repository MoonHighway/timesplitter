import { pick } from "./pick";
import { deepData, shallowData } from "./pick.test.data";

describe("picking the first topic in the course", () => {
  let topic, current, prev, next;
  beforeAll(() => {
    [topic, [prev, current, next]] = pick(shallowData);
  });
  it("picks correct topic", () =>
    expect(topic).toEqual({ title: "First Section" }));
  it("picks correct previous route", () => expect(prev).not.toBeDefined());
  it("picks the correct current route", () =>
    expect(current).toEqual("course-level/first-section"));
  it("picks the correct next route", () =>
    expect(next).toEqual("course-level/second-section"));
});

describe("picking the first topic in a deep course", () => {
  let topic, current, prev, next;
  beforeAll(() => {
    [topic, [prev, current, next]] = pick(deepData);
  });
  it("picks correct topic", () => expect(topic.title).toEqual("First Section"));
  it("picks correct previous route", () => expect(prev).not.toBeDefined());
  it("picks the correct current route", () =>
    expect(current).toEqual("course-level/first-section"));
  it("picks the correct next route", () =>
    expect(next).toEqual("course-level/first-section/first-topic"));
});

describe("picking the last topic in the course", () => {
  let topic, current, prev, next;
  beforeAll(() => {
    [topic, [prev, current, next]] = pick(
      shallowData,
      "course-level/third-section"
    );
  });
  it("picks correct topic", () =>
    expect(topic).toEqual({ title: "Third Section" }));
  it("picks correct previous route", () =>
    expect(prev).toEqual("course-level/second-section"));
  it("picks the correct current route", () =>
    expect(current).toEqual("course-level/third-section"));
  it("picks the next correct route", () => expect(next).not.toBeDefined());
});

// describe("picking the next sibling item");

// describe("picking the previous sibling item");

// describe("picking the next nested item");

// describe("picking the previous nested item");

// describe("picking the next nested sibling");

// describe("picking the previous nested sibling");
