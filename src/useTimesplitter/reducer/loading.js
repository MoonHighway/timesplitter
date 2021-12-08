export default function loading(state = false, action = {}) {
  switch (action.type) {
    case "LOAD":
      return true;
    case "LOADED":
      return false;
    case "ERROR":
      return false;
    default:
      return state;
  }
}
