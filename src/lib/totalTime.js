export const totalTime = (topic = {}) => {
  if (topic.length) {
    return topic.length + (topic.adjusted || 0);
  }

  if (topic.agenda && topic.agenda.length) {
    return topic.agenda.reduce((total, topic) => {
      return total + totalTime(topic);
    }, 0);
  }
  return 0;
};
