import { totalTime, toMilliseconds } from "../../lib";
import { format } from "date-fns";

const scopedCounters = {
  runningTotal: 0
};

function topic(state = {}, action = {}) {
  switch (action.type) {
    case "ADJUST":
      
      const est = state.length || totalTime(state);
      if (!est) return {
        ...state,
        agenda: agenda(state.agenda, action),
      }

      const startsAt = action.payload.startTime + toMilliseconds(scopedCounters.runningTotal);
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
