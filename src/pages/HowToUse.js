import { useState, useEffect } from "react";
import { NavigationBar, MDX } from "../ui";
import { BookStyles } from "../book-ui";
import { useContent } from "../hooks";

const missingInstructions = `
# Missing INSTRUCTIONS.md

<Warning>
The INSTRUCTIONS.md cannot be found in the root of this project.

Currently timesplitter projects require an INSTRUCTIONS.md document that explains to presenters/instructors how to use the course.
</Warning>
`;

export default function HowToUse() {
  const content = useContent();
  const [md, setMD] = useState();

  useEffect(() => {
    fetch("/content/instructions")
      .then((res) => (res.status === 500 ? missingInstructions : res.text()))
      .then(setMD)
      .catch(console.error);
  }, []);

  if (md) {
    return (
      <BookStyles>
        <MDX>{md}</MDX>
        <NavigationBar
          prev={{ to: "/toc", text: "Table of Contents" }}
          next={{ to: "/overview", text: "Course Overview" }}
        />
      </BookStyles>
    );
  }

  return null;
}
