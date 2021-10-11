import { totalTime } from "../../lib";

//
// [ ] Sections should total time
// [ ] {time} should contained scheduled in MS
//

function addTime(topic, est) {
  if (est) {
    return {
      ...topic,
      time: { est },
    };
  }

  return topic;
}

function topic(state = {}, action = {}) {
  switch (action.type) {
    case "ADJUST":
      return {
        ...addTime(state, state.length || totalTime(state)),
        agenda: agenda(state.agenda, action),
      };

    default:
      return state;
  }
}

function agenda(state = [], action = {}) {
  switch (action.type) {
    case "ADJUST":
      return state.map((t) => topic(t, action));
    default:
      return state;
  }
}

export default function course(state, action = {}) {
  switch (action.type) {
    case "ADJUST":
      return {
        ...state,
        agenda: agenda(state.agenda, action),
      };
    case "LOADED":
      return action.payload;
    default:
      return state;
  }
}
