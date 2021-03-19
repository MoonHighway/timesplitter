import { lazy, Suspense } from "react";
import { NavigationBar } from "../ui";
import { BookStyles } from "../book-ui";
import { pickFirst } from "../lib";
import { useContent } from "../hooks";

// const Content = lazy(() =>
//   import("!babel-loader!mdx-loader!../book/overview.md")
// );

export default function Overview() {
  const content = useContent();
  let [topic, route] = pickFirst(content);

  //
  // This cannot stand... this new system is for all classes, not just one
  //

  route = route.replace("javascript-jungle-teacher's-edition", "agenda");

  return (
    <h1>Commeted Out</h1>
    // <BookStyles>
    //   <Suspense fallback={<h1>loading</h1>}>
    //     <Content />
    //   </Suspense>
    //   <NavigationBar
    //     prev={{ to: "/how-to-use", text: "How to use this Guide" }}
    //     next={{ to: route, text: `Begin ${topic.title}` }}
    //   />
    // </BookStyles>
  );
}
