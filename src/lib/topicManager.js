import { totalTime } from ".";

export const urlFriendly = (str) => str.trim().toLowerCase().replace(/ /g, "-");
export const titlesOnly = ({ title }) => urlFriendly(title);
export const byTitle = (title) => (topic) =>
  urlFriendly(topic.title) === urlFriendly(title);
export const createTime = (length, topic, parent) =>
  !!length
    ? { length, est: length }
    : !!parent && parent.agenda && parent.time.length
    ? { est: parent.time.length / parent.agenda.length }
    : { est: totalTime(topic) };

/**
 * Takes an object of deeply nested topics under the agenda field and returns a flat array of those topics
 * @param {Object} course a deeply nested course of topics. A topic must contain at least a title and an agenda
 * @returns {Array} a flat array of topics
 */
export function flattenCourse(course, parent, breadcrumbs = []) {
  const { agenda, length, ...rest } = course;
  const time = createTime(length, course, parent);
  const topic = { id: urlFriendly(rest.title), time, breadcrumbs, ...rest };
  if (agenda) {
    topic.agenda = agenda.map(titlesOnly);
    return [
      topic,
      ...course.agenda.flatMap((t) =>
        flattenCourse(t, topic, [...breadcrumbs, urlFriendly(topic.title)])
      ),
    ];
  }
  return topic;
}

/**
 * Finds a topic in a list and recursively nests it under a parent topics agenda. Used with
 * categorizeCourse(flatCourse) to convert a flat array of topics into a deeply nested course object.
 *
 * @param {String} ref a urlFriendly reference to a topics title
 * @param {Array} topics a flat list of all topic objects
 * @returns {Object} a deeply nested topic object that contains topics under parent topic agendas
 */
function buildTree(ref, topics) {
  const { id, time, breadcrumbs, ...rest } = topics.find(byTitle(ref));
  const topic = time.length ? { length: time.length, ...rest } : { ...rest };
  if (topic.agenda) {
    return {
      ...topic,
      agenda: topic.agenda.map((ref) => buildTree(ref, topics)),
    };
  }
  return { ...topic };
}

/**
 * Converts a flat array of topics into a deeply nested topic object. This is the opposite of flattenCourse(course);
 * @param {*} flatCourse a flat Array of topics that contain references to child agenda items
 * @returns {Object} A course with a nested hierarchy of topics
 */
export function categorizeCourse(flatCourse) {
  const [{ id, time, breadcrumbs, ...rest }] = flatCourse;
  const course = time.length ? { length: time.length, ...rest } : { ...rest };
  return {
    ...course,
    agenda: course.agenda.map((ref) => buildTree(ref, flatCourse)),
  };
}
