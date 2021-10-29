import { totalTime, toMilliseconds, adjustCourseTimes } from "../../lib";

const scopedCounters = {
  runningTotal: 0,
};

function topic(state = {}, action = {}) {
  switch (action.type) {
    case "ADJUST":
      const est = state.length + (state.adjusted || 0) || totalTime(state);
      if (!est)
        return {
          ...state,
          agenda: agenda(state.agenda, action),
        };

      const startsAt =
        action.payload.startTime + toMilliseconds(scopedCounters.runningTotal);
      if (state.type !== "section") scopedCounters.runningTotal += est;

      return {
        ...state,
        time: { est, startsAt },
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
      scopedCounters.runningTotal = 0;
      let nextState =
        action.payload.length > 0
          ? adjustCourseTimes(state, action.payload.length)
          : { ...state };
      return {
        ...nextState,
        agenda: agenda(state.agenda, action),
        time: {
          start: action.payload.startTime,
        },
      };
    case "LOADED":
      return action.payload;
    default:
      return state;
  }
}
