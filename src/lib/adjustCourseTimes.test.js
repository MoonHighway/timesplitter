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

const moreTimeResults = {
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

const lessTimeResults = {
  title: "sample data",
  agenda: [
    {
      title: "first section",
      agenda: [
        { title: "not enough time", length: 1 },
        { title: "topic a", length: 2, adjusted: -1 },
        { title: "topic b", length: 2, adjusted: -1 },
        { title: "topic c", length: 4, adjusted: -2 },
      ],
    },
    {
      title: "second section",
      agenda: [
        {
          title: "locked",
          lock: true,
          length: 20,
        },
        {
          title: "topic d",
          length: 20,
          adjusted: -3,
        },
        {
          title: "topic e",
          length: 15,
          adjusted: -3,
        },
      ],
    },
    {
      title: "third section",
      agenda: [
        {
          title: "topic f",
          length: 7,
          adjusted: -3,
        },
        {
          title: "topic h",
          length: 5,
          adjusted: -3,
        },
        {
          title: "topic i",
          length: 19,
          adjusted: -2,
        },
        {
          title: "topic j",
          length: 25,
          adjusted: -2,
        },
      ],
    },
  ],
};

const manualResults = {
  title: "sample data",
  manualAdjustmentRequired: {
    remainingTime: -30,
  },
  agenda: [
    {
      title: "first section",
      agenda: [
        { title: "not enough time", length: 1 },
        { title: "topic a", length: 2, adjusted: -1 },
        { title: "topic b", length: 2, adjusted: -1 },
        { title: "topic c", length: 4, adjusted: -3 },
      ],
    },
    {
      title: "second section",
      agenda: [
        { title: "locked", lock: true, length: 20 },
        { title: "topic d", length: 20, adjusted: -19 },
        { title: "topic e", length: 15, adjusted: -14 },
      ],
    },
    {
      title: "third section",
      agenda: [
        { title: "topic f", length: 7, adjusted: -6 },
        { title: "topic h", length: 5, adjusted: -4 },
        { title: "topic i", length: 19, adjusted: -18 },
        { title: "topic j", length: 25, adjusted: -24 },
      ],
    },
  ],
};

describe.skip("adjustCourseTimes()", () => {
  it("correctly distributes an additional 20 minutes to a course", () => {
    expect(totalTime(sampleData)).toEqual(120);
    const result = adjustCourseTimes(sampleData, 20);
    expect(result).toEqual(moreTimeResults);
    expect(totalTime(result)).toEqual(140);
  });

  it("correctly reduces 40 minutes from a course", () => {
    expect(totalTime(sampleData)).toEqual(140);
    const result = adjustCourseTimes(sampleData, -40);
    expect(result).toEqual(lessTimeResults);
    expect(totalTime(result)).toEqual(100);
  });

  it("triggers a manual adjust", () => {
    expect(totalTime(sampleData)).toEqual(100);
    const result = adjustCourseTimes(sampleData, -100);
    expect(result).toEqual(manualResults);
    expect(totalTime(result)).toEqual(30);
  });

  it("triggers a manual adjust", () => {
    expect(totalTime(sampleData)).toEqual(30);
    const result = adjustCourseTimes(sampleData, 0);
    delete manualResults.manualAdjustmentRequired;
    expect(result).toEqual(manualResults);
    expect(totalTime(result)).toEqual(30);
  });
});
