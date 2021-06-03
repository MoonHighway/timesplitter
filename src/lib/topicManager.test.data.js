export const sampleCourse = {
  title: "sample course",
  agenda: [
    {
      title: "Chapter One",
      agenda: [
        {
          title: "step one",
          agenda: [
            {
              title: "task A",
              length: 5,
            },
            {
              title: "task B",
              length: 5,
              agenda: [{ title: "Challenge 1" }, { title: "Challenge 2" }],
            },
          ],
        },
      ],
    },
  ],
};

export const flatSampleCourse = [
  {
    id: "sample-course",
    title: "sample course",
    agenda: ["chapter-one"],
    breadcrumbs: [],
    time: {
      est: 10,
    },
  },
  {
    id: "chapter-one",
    title: "Chapter One",
    agenda: ["step-one"],
    breadcrumbs: ["sample-course"],
    time: {
      est: 10,
    },
  },
  {
    id: "step-one",
    title: "step one",
    agenda: ["task-a", "task-b"],
    breadcrumbs: ["sample-course", "chapter-one"],
    time: {
      est: 10,
    },
  },
  {
    id: "task-a",
    title: "task A",
    breadcrumbs: ["sample-course", "chapter-one", "step-one"],
    time: {
      length: 5,
      est: 5,
    },
  },
  {
    id: "task-b",
    title: "task B",
    agenda: ["challenge-1", "challenge-2"],
    breadcrumbs: ["sample-course", "chapter-one", "step-one"],
    time: {
      length: 5,
      est: 5,
    },
  },
  {
    id: "challenge-1",
    title: "Challenge 1",
    breadcrumbs: ["sample-course", "chapter-one", "step-one", "task-b"],
    time: {
      est: 2.5,
    },
  },
  {
    id: "challenge-2",
    title: "Challenge 2",
    breadcrumbs: ["sample-course", "chapter-one", "step-one", "task-b"],
    time: {
      est: 2.5,
    },
  },
];
