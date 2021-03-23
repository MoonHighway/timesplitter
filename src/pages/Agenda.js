import { lazy, Suspense } from "react";
// import courseAgenda from "../book/manifest.json";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "../ui";
import { pickPrevious, pickNext } from "../lib";
import { BookStyles } from "../book-ui";
import { useContent } from "../hooks";

//
// Loading Content Pages
//
//  [ ] Create Route /content/{...rest}
//  [ ] Load the appropriate page on the server
//  [ ] Load Previous and Next Routes on the server
//  [ ] Pass all info from server as json
//  [ ] Display the Pages
//  [ ] Step Through Sample Course
//  [ ] Step Through Escape Jungle Course
//

//
// Next..
//
//  [ ] Handle End Screen
//  [ ] Specify PORT
//  [ ] If PORT is chosen, randomize port
//  [ ] Quickly Review Issues
//  [ ] Send PR
//

// function useBookContent(path = []) {
// let [pTopic, pRoute] = pickPrevious(content, ...path);
// let [nTopic, nRoute] = pickNext(content, ...path);
// if (!pTopic) {
//   pTopic = { title: "Course Overview" };
//   pRoute = "/overview";
// } else {
//   pRoute = `/agenda/${pRoute}`;
// }
// if (!nTopic) {
//   nTopic = { title: "End Course" };
//   nRoute = "/end";
// } else {
//   nRoute = `/agenda/${nRoute}`;
// }
//return [`${path.join("/")}.md`, [pTopic, pRoute], [nTopic, nRoute]];
//}

export default function Agenda() {
  let { pathname } = useLocation();
  console.log("🤔", pathname);
  const content = useContent(pathname);

  return (
    <pre>{JSON.stringify(content, null, 2)}</pre>
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
