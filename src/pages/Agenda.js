import { lazy, Suspense } from "react";
// import courseAgenda from "../book/manifest.json";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "../ui";
import { pickPrevious, pickNext } from "../lib";
import { BookStyles } from "../book-ui";
import { useContent } from "../hooks";

function useBookContent(path = []) {
  const content = useContent();
  let [pTopic, pRoute] = pickPrevious(content, ...path);
  let [nTopic, nRoute] = pickNext(content, ...path);

  if (!pTopic) {
    pTopic = { title: "Course Overview" };
    pRoute = "/overview";
  } else {
    pRoute = `/agenda/${pRoute}`;
  }

  if (!nTopic) {
    nTopic = { title: "End Course" };
    nRoute = "/end";
  } else {
    nRoute = `/agenda/${nRoute}`;
  }

  return [`${path.join("/")}.md`, [pTopic, pRoute], [nTopic, nRoute]];
}

export default function Agenda() {
  let { pathname } = useLocation();
  const [fileName, [pTopic, pRoute], [nTopic, nRoute]] = useBookContent(
    pathname.replace("/agenda/", "").split("/")
  );

  //
  // This is where we'll have to load the content file
  //
  //   [ ] Can lazy be used with fetch
  //   [ ] Change where/how content is imported
  //
  //

  // const Content = lazy(() =>
  //   import(`!babel-loader!mdx-loader!../book/${fileName}`)
  // );

  return (
    <h1>Commeted Out</h1>
    // <BookStyles>
    //   <Suspense fallback={<h1>loading</h1>}>
    //     <Content />
    //   </Suspense>
    //   <NavigationBar
    //     prev={{ to: pRoute, text: pTopic.title }}
    //     next={{ to: nRoute, text: nTopic.title }}
    //   />
    // </BookStyles>
  );
}
