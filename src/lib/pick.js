export const urlFriendly = (str) => str.trim().toLowerCase().replace(/ /g, "-");
export const toUrlFriendly = ({ title }) => urlFriendly(title);
export const toRoute = (...titles) => titles.map(urlFriendly).join("/");
export const searchByTitle =
  (searchTitle) =>
  ({ title }) =>
    urlFriendly(title) === urlFriendly(searchTitle);

export function pickNextRoute(content, route, parent) {
  const [current] = route.split("/").reverse();

  if (content.agenda) {
    const [topic] = content.agenda;
    return toRoute(route, topic.title);
  }

  const index = parent.agenda.map(toUrlFriendly).indexOf(current) + 1;
  if (index >= parent.agenda.length) {
    return;
  }
  const topic = parent.agenda[index];
  return toRoute(parent.title, topic.title);
}

export function pickPreviousRoute(content, route, parent) {
  const [current] = route.split("/").reverse();
  const index = parent.agenda.map(toUrlFriendly).indexOf(current) - 1;
  const topic = parent.agenda[index];
  return toRoute(parent.title, topic.title);
}

export function pick(content, route) {
  if (route) {
    const [, nextRoute] = route.split("/");
    const topic = content.agenda.find(searchByTitle(nextRoute));
    const current = toRoute(content.title, topic.title);
    const prev = pickPreviousRoute(topic, current, content);
    const next = pickNextRoute(topic, current, content);
    return [topic, [prev, current, next]];
  }

  const [topic] = content.agenda;
  const current = toRoute(content.title, topic.title);
  const next = pickNextRoute(topic, current, content);
  return [topic, [, current, next]];
}
