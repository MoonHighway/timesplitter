import loading from "./loading";
import preview from "./preview";
import course from "./course";
import adjust from "./adjust";

export default function reducer(state = null, action = {}) {
  return {
    loading: loading(state.loading, action),
    preview: preview(state.preview, action),
    adjust: adjust(state.adjust, action),
    course: course(state.course, action),
  };
}
