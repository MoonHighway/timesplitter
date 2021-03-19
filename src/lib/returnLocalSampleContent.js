export const returnLocalSampleContent = (done = (f) => f) => async () => {
  console.log("Loading Local Sample Content for Development");
  const content = await import("../_content-sample/timesplitter.json");
  done(content.default ? content.default : content);
};
