import { pickPrevious, pickNext } from "./pick";
import manifest from "../book/manifest.json";

describe("Production Cases", () => {
  it("pick previous from chapter overview", () => {
    const [topic, route] = pickPrevious(
      manifest,
      "hello-world",
      "intro-slides"
    );
    expect(topic.title).toEqual("Chapter Overview");
    expect(route).toEqual("hello-world/chapter-overview");
  });

  it("should dive deep into environment topic", () => {
    const [topic, route] = pickNext(manifest, "hello-world", "intro-slides");
    expect(topic.title).toEqual("install-vscode");
    expect(route).toEqual("hello-world/environment-setup/install-vscode");
  });

  it("picks the previous deep topic", () => {
    const [topic, route] = pickPrevious(
      manifest,
      "hello-world",
      "environment-setup",
      "install-vscode"
    );
    expect(topic.title).toEqual("Intro Slides");
    expect(route).toEqual("hello-world/intro-slides");
  });
});
