import loading from "./loading";
import preview from "./preview";
import course from "./course";

export default function reducer(state = null, action = {}) {
  return {
    loading: loading(state.loading, action),
    preview: preview(state.preview, action),
    course: course(state.course, action),
  };
}
