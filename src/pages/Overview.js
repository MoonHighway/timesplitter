import { NavigationBar } from "../ui";
import { BookStyles } from "../book-ui";
import { usePresenter } from "../hooks";
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
  const { md, topic } = usePresenter("overview");

  if (md && topic) {
    return (
      <BookStyles>
        <MDX components={mdxComponents}>{md}</MDX>
        <NavigationBar
          prev={{ to: "/how-to-use", text: "How to use this Guide" }}
          next={{ to: "/", text: `TODO: Setup First Route` }}
        />
      </BookStyles>
    );
  }

  return null;
}
