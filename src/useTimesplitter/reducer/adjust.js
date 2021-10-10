const samples = [
  { title: "this topic", time: { est: 5 } },
  { title: "that topic", time: { est: 2 } },
  { title: "the other topic", time: { est: 12 } },
  { title: "the main topic", time: { est: 3 } },
];

export default function adjust(
  state = {
    manualAdjust: false,
    minsOver: 10,
    endTime: new Date(),
    remainingTopics: samples,
  },
  action = {}
) {
  switch (action.type) {
    default:
      return state;
  }
}
