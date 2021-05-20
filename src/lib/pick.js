export const titlesOnly = ({ title }) => title;

export function flattenCourse(course) {
  const { agenda, ...rest } = course;
  if (agenda) {
    return [{ ...rest }, ...course.agenda.flatMap(flattenCourse)];
  }
  return { ...rest };
}

export function categorizeCourse(flattenedCourse) {}

export function pick(course) {
  const [firstTopic] = flattenCourse(course);
  return firstTopic;
}
