function flatten(course) {
  if (!course) return;
  if (course.agenda) {
    return [course, ...course.agenda.flatMap((t) => flatten(t))];
  }
  return course;
}

export function canReduceCourseTime(course) {
  const adjustableTopics = flatten(course).reduce((results, topic) => {
    if (topic.length && topic.length - (topic.adjusted || 0) > 1 && !topic.lock)
      return [...results, topic];
    return results;
  }, []);

  return !!adjustableTopics.length;
}
