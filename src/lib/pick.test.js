import { flattenCourse, titlesOnly, categorizeCourse, pick } from "./pick";
import { sampleCourse } from "./pick.test.data";

it("flattenCourse(course)", () => {
  const result = flattenCourse(sampleCourse);
  expect(result).toEqual([
    "sample course",
    "Chapter One",
    "step one",
    "task A",
    "task B",
    "Challenge 1",
    "Challenge 2",
  ]);
});
