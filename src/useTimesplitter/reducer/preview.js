export default function preview(state = true, action = {}) {
  switch (action.type) {
    case "START":
      return false;
    default:
      return state;
  }
}
