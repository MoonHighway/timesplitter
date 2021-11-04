import { canReduceCourseTime } from ".";

const canAdjust = ({ length = 0, adjusted = 0, lock = false }) =>
  lock || length + adjusted > 1;
const canReduceAgenda = (agenda) => agenda.some(canAdjust);

function flatten(course) {
  if (!course) return;
  if (course.agenda) {
    return [course, ...course.agenda.flatMap((t) => flatten(t))];
  }
  return course;
}

export function adjustCourseTimes(course, adjustMinutes) {
  const addTime = adjustMinutes > 0;

  // If we are reducing time, but cannot shave time off course
  if (addTime && !canReduceCourseTime(course))
    return {
      ...course,
      manualAdjustmentRequired: {
        remainingTime: adjustMinutes,
      },
    };

  // Create an array of topic titles that have time and their length
  const timedTopics = flatten(course).reduce((results, topic) => {
    if (topic.length && topic.length > 1 && !topic.lock)
      return [...results, topic];
    return results;
  }, []);

  // There are topics that can be adjusted
  if (!!timedTopics.length) {
    if (addTime) {
      // Adjust times for more time in the topics array
      let index = timedTopics.length - 1;
      while (adjustMinutes > 0) {
        if (timedTopics[index].adjusted) timedTopics[index].adjusted++;
        else timedTopics[index].adjusted = 1;
        adjustMinutes--;
        if (index === 0) index = timedTopics.length - 1;
        else index--;
      }
    }

    // Adjust times for less time in a topic array
    if (!addTime) {
      let index = timedTopics.length - 1;
      while (adjustMinutes < 0 && canReduceAgenda(timedTopics)) {
        if (canAdjust(timedTopics[index])) {
          if (timedTopics[index].adjusted) timedTopics[index].adjusted--;
          else timedTopics[index].adjusted = -1;
          adjustMinutes++;
        }

        // Circulate backwards through timed topics until all adjustments have been made
        if (index === 0) index = timedTopics.length - 1;
        else index--;
      }
    }

    if (adjustMinutes < 0) {
      return {
        ...hydrateTopics(course, timedTopics),
        manualAdjustmentRequired: {
          remainingTime: adjustMinutes,
        },
      };
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
