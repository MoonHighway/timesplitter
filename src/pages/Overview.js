import { useState, useEffect, useMemo } from "react";
import { flattenCourse } from "../lib";
import { NavigationBar } from "../ui";
import { useContent } from "../hooks";
import { BookStyles } from "../book-ui";
import * as mdxComponents from "../mdx-components";
import MDX from "@mdx-js/runtime";

const missingREADME = `
# Missing README.md

<Warning>
The README.md cannot be found in the root of this project.

Currently timesplitter projects require an README.md that provides presenters/instructors with an overview of the course materials.
</Warning>
`;

export default function Overview() {
  const [md, setMD] = useState();
  const course = useContent();
  const flatCourse = useMemo(() => {
    if (!course) return;
    const [, ...topics] = flattenCourse(course);
    return topics;
  }, [course]);

  useEffect(() => {
    fetch("/content/overview")
      .then((res) => (res.status === 500 ? missingREADME : res.text()))
      .then(setMD)
      .catch(console.error);
  }, []);

  if (!flatCourse) return null;

  const [topic] = flatCourse;

  if (md) {
    return (
      <BookStyles>
        <MDX components={mdxComponents}>{md}</MDX>
        <NavigationBar
          prev={{ to: "/how-to-use", text: "How to use this Guide" }}
          next={{ to: `/agenda/${topic.id}`, text: `Start: ${topic.title}` }}
        />
      </BookStyles>
    );
  }

  return null;
}
