import { adjustCourseTimes, totalTime } from ".";

const sampleData = {
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
        { title: "topic h", length: 5 },
        { title: "topic i", length: 19 },
        { title: "topic j", length: 25 },
      ],
    },
  ],
};

const expectedResults = {
  title: "sample data",
  agenda: [
    {
      title: "first section",
      agenda: [
        { title: "not enough time", length: 1 },
        { title: "topic a", length: 2, adjusted: 2 },
        { title: "topic b", length: 2, adjusted: 2 },
        { title: "topic c", length: 4, adjusted: 2 },
      ],
    },
    {
      title: "second section",
      agenda: [
        { title: "locked", lock: true, length: 20 },
        { title: "topic d", length: 20, adjusted: 2 },
        { title: "topic e", length: 15, adjusted: 2 },
      ],
    },
    {
      title: "third section",
      agenda: [
        { title: "topic f", length: 7, adjusted: 2 },
        { title: "topic h", length: 5, adjusted: 2 },
        { title: "topic i", length: 19, adjusted: 3 },
        { title: "topic j", length: 25, adjusted: 3 },
      ],
    },
  ],
};

describe("adjustCourseTimes()", () => {
  it("correctly distributes an additional 20 minutes to a course", () => {
    // Correctly totals sample times
    expect(totalTime(sampleData)).toEqual(120);
    const result = adjustCourseTimes(sampleData, 20);
    // Replaces correct times only
    expect(result).toEqual(expectedResults);
    // Correctly totals course times with adjusted time
    expect(totalTime(result)).toEqual(140);
  });
});
