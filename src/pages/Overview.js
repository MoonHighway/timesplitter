import { useState, useEffect } from "react";
import { NavigationBar } from "../ui";
import { BookStyles } from "../book-ui";
import { pickFirst } from "../lib";
import { useContent } from "../hooks";
import * as mdxComponents from "../mdx-components";
import MDX from "@mdx-js/runtime";

export default function Overview() {
  const content = useContent();
  const [topic, setTopic] = useState();
  let [route, setRoute] = useState();
  const [md, setMD] = useState();

  useEffect(() => {
    fetch("/content/overview")
      .then((res) => res.text())
      .then(setMD)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!content) return;
    let [topic, route] = pickFirst(content);
    setTopic(topic);
    setRoute(route);
  }, [content]);

  if (md && topic && route) {
    return (
      <BookStyles>
        <MDX components={mdxComponents}>{md}</MDX>
        <NavigationBar
          prev={{ to: "/how-to-use", text: "How to use this Guide" }}
          next={{ to: route, text: `Begin ${topic.title}` }}
        />
      </BookStyles>
    );
  }

  return null;
}
