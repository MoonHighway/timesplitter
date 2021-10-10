export default function course(state, action = {}) {
  switch (action.type) {
    case "LOADED":
      return action.payload;
    default:
      return state;
  }
}
