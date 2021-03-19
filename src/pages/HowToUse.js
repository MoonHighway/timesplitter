import { lazy, Suspense } from "react";
import { NavigationBar } from "../ui";
import { BookStyles } from "../book-ui";

// const Content = lazy(() =>
//   import("!babel-loader!mdx-loader!../book/how-to-use.md")
// );

export default function HowToUse() {
  return (
    <h1>Commeted Out</h1>
    // <BookStyles>
    //   <Suspense fallback={<h1>loading</h1>}>
    //     <Content />
    //   </Suspense>
    //   <NavigationBar
    //     prev={{ to: "/toc", text: "Table of Contents" }}
    //     next={{ to: "/overview", text: "Overview" }}
    //   />
    // </BookStyles>
  );
}
