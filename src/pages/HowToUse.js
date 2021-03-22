import { useState, useEffect } from "react";
import { NavigationBar, MDX } from "../ui";
import { BookStyles } from "../book-ui";
import { useContent } from "../hooks";

//
// LET'S GO!! 🤨
//
//  [x] Serve INSTRUCTIONS.md
//  [x] Fetch INSTRUCTIONS.md
//  [x] Render INSTRUCTIONS.md
//  [ ] If INSTRUCTIONS.md not found... make a nice error message
//  [ ] If README.md not found... make a nice error message
//  [x] Refactor MDX component (so you don't have to always add mdxComponents)
//  [ ] serve _assets from root folder
//  [ ] Images can be loaded in MDX
//

export default function HowToUse() {
  const content = useContent();
  const [md, setMD] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch("/content/instructions")
        .then((res) => res.text())
        .catch(console.error);

      console.log(res);
    })();
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
