function flatten(course) {
  if (!course) return;
  if (course.agenda) {
    return [course, ...course.agenda.flatMap((t) => flatten(t))];
  }
  return course;
}

export function adjustCourseTimes(course, adjustMinutes) {
  // Create an array of topic titles that have time and their length
  const timedTopics = flatten(course).reduce((results, topic) => {
    if (topic.length && topic.length > 1 && !topic.lock)
      return [...results, topic];
    return results;
  }, []);

  if (!!timedTopics.length) {
    // Adjust times in the topics array
    let index = timedTopics.length - 1;
    while (adjustMinutes > 0) {
      if (timedTopics[index].adjusted) timedTopics[index].adjusted++;
      else timedTopics[index].adjusted = 1;
      adjustMinutes--;
      if (index === 0) index = timedTopics.length - 1;
      else index--;
    }

    // Add the adjusted times back to the original course
    return hydrateTopics(course, timedTopics);
  }

  return course;
}

const withTitle = (title) => (t) => t.title === title;

function hydrateTopics(course, topicList) {
  if (course.agenda)
    return {
      ...course,
      ...topicList.find(withTitle(course.title)),
      agenda: course.agenda.map((topic) => hydrateTopics(topic, topicList)),
    };

  return {
    ...course,
    ...topicList.find(withTitle(course.title)),
  };
}
