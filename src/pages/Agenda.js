import { useLocation } from "react-router-dom";
import { NavigationBar, MDX } from "../ui";
import { BookStyles } from "../book-ui";
import { useContentLinks, useContentFile } from "../hooks";

//
// Next..
//
//  [x] Handle End Screen
//  [ ] Missing Code Formatting
//  [ ] Specify PORT
//  [ ] If PORT is chosen, randomize port
//  [ ] Quickly Review Issues
//  [ ] Send PR
//

export default function Agenda() {
  let { pathname } = useLocation();
  const md = useContentFile(pathname);
  const [, , ...pathArray] = pathname.split("/");
  const [[pTopic, pRoute], [nTopic, nRoute]] = useContentLinks(pathArray);
  return (
    <BookStyles>
      <MDX>{md}</MDX>
      <NavigationBar
        prev={{ to: pRoute, text: pTopic.title }}
        next={{ to: nRoute, text: nTopic.title }}
      />
    </BookStyles>
  );
}
