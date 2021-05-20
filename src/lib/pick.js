export const urlFriendly = (str) => str.trim().toLowerCase().replace(/ /g, "-");
export const toUrlFriendly = ({ title }) => urlFriendly(title);
export const toRoute = (...titles) => titles.map(urlFriendly).join("/");
export const searchByTitle =
  (searchTitle) =>
  ({ title }) =>
    urlFriendly(title) === urlFriendly(searchTitle);

export function pickNextRoute(content, route, parent) {
  const [current] = route.split("/").reverse();
  const index = parent.agenda.map(toUrlFriendly).indexOf(current) + 1;
  const topic = parent.agenda[index];
  return toRoute(parent.title, topic.title);
}

export function pick(content) {
  if (content.agenda) {
    const [topic] = content.agenda;
    const current = toRoute(content.title, topic.title);
    const next = pickNextRoute(topic, current, content);
    return [topic, [, current, next]];
  }
}
