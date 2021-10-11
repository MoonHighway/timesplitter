import { totalTime } from "../../lib";
import { format } from "date-fns";

//
// PROBLEM
// I need to recursively pass the total.
// It needs to be wrapped and passed so the functions remain pure.
//

const toMilliseconds = (time) => time * 60 * 1000;

let total = 0;
function addTime(topic, est, startTime) {
  if (est) {
    const t = startTime + toMilliseconds(total);
    if (topic.type !== "section") total += est;
    return {
      ...topic,
      time: {
        est,
        startsAt: format(t, "h:mm aa"),
      },
    };
  }

  return topic;
}

function topic(state = {}, action = {}) {
  switch (action.type) {
    case "ADJUST":
      return {
        ...addTime(
          state,
          state.length || totalTime(state),
          action.payload.startTime
        ),
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
