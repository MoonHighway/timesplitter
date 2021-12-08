import { canReduceCourseTime } from "./canReduceCourseTime";

const canReduceData = {
  title: "sample data",
  agenda: [
    {
      title: "first section",
      agenda: [
        { title: "not enough time", length: 1 },
        { title: "topic a", length: 2 },
        { title: "topic b", length: 2 },
        { title: "topic c", length: 4 },
      ],
    },
    {
      title: "second section",
      agenda: [
        { title: "locked", lock: true, length: 20 },
        { title: "topic d", length: 20 },
        { title: "topic e", length: 15 },
      ],
    },
    {
      title: "third section",
      agenda: [
        { title: "topic f", length: 7 },
        { title: "topic h", lock: true, length: 5 },
        { title: "topic i", length: 19 },
        { title: "topic j", lock: true, length: 25 },
      ],
    },
  ],
};

const cannotReduceData = {
  title: "sample data",
  agenda: [
    {
      title: "first section",
      agenda: [
        { title: "not enough time", length: 1 },
        { title: "topic a", length: 2, adjusted: 1 },
        { title: "topic b", length: 2, adjusted: 1 },
        { title: "topic c", length: 4, adjusted: 3 },
      ],
    },
    {
      title: "second section",
      agenda: [
        { title: "locked", lock: true, length: 20 },
        { title: "topic d", length: 20, adjusted: 19 },
        { title: "topic e", length: 15, adjusted: 14 },
      ],
    },
    {
      title: "third section",
      agenda: [
        { title: "topic f", length: 7, adjusted: 6 },
        { title: "topic h", lock: true, length: 5 },
        { title: "topic i", length: 19, adjusted: 18 },
        { title: "topic j", lock: true, length: 25 },
      ],
    },
  ],
};

test("course times can be reduced", () => {
  const results = canReduceCourseTime(canReduceData);
  expect(results).toEqual(true);
});

test("course times cannot be reduced", () => {
  const results = canReduceCourseTime(cannotReduceData);
  expect(results).toEqual(false);
});
