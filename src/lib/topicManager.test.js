import { flattenCourse, titlesOnly, categorizeCourse } from ".";
import { sampleCourse, flatSampleCourse } from "./topicManager.test.data";

it("titlesOnly(title)", () => {
  expect(titlesOnly({ title: "Foo Foo" })).toEqual("foo-foo");
});

it("flattenCourse(course)", () =>
  expect(flattenCourse(sampleCourse)).toEqual(flatSampleCourse));

it("categorizeCourse(flatCourse)", () => {
  const flatCourse = flattenCourse(sampleCourse);
  const result = categorizeCourse(flatCourse);
  expect(result).toEqual(sampleCourse);
});
