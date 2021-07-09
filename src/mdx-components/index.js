import styled from "styled-components";
import { CodeBlock } from "../ui";

export * from "./Warning";
export * from "./Error";
export * from "./Info";
export * from "./Success";
export * from "./Homework";
export * from "./Checklist";
export * from "./Question";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    margin-left: 2em;
  }
`;

export const BlueBox = styled.div`
  background-color: blue;
  color: white;
  padding: 2em;
`;

//
// TODO: Get Line Numbers Highlighting
//
//    [ ] Get any JSX tag to wrap a code block
//    [ ] Figure out how to pass lines from highlight code to the code block
//

export const HighlightCode = ({ lines = [], children }) => (
  <CodeBlock selectLines={lines}>{children}</CodeBlock>
);
