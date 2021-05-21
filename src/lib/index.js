export * from "./totalTime";
export * from "./topicManager";

export const toJSON = (res) => res.json();

export const toText = (res) => res.text();

export const throwIt = (msg) => (error) => {
  if (msg) {
    console.error(msg);
  }
  throw error;
};
