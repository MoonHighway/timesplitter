export const totalTime = (topic = {}) => {
  if (topic.length) {
    return topic.length;
  }

  if (topic.agenda && topic.agenda.length) {
    return topic.agenda.reduce((total, topic) => {
      return total + totalTime(topic);
    }, 0);
  }
  return 0;
};
