export * from "./totalTime";
export * from "./topicManager";
export * from "./icons";
export * from "./DifficultyDropDown";
export * from "./TimeDropDown";
export * from "./TimeDisplay";
export * from "./adjustCourseTimes";
export * from "./canReduceCourseTime";

export const toJSON = (res) => res.json();

export const toText = (res) => res.text();

export const throwIt = (msg) => (error) => {
  if (msg) {
    console.error(msg);
  }
  throw error;
};

export const toMilliseconds = (time) => time * 60 * 1000;

export function round(value, precision = 0) {
  var multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}
