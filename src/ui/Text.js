import styled from "styled-components";
import { fonts } from "../theme";
import * as mdxComponents from "../mdx-components";
import Markdown from "@mdx-js/runtime";
import { CodeBlock } from "./CodeBlock";

export function MDX({ children }) {
  return (
    <Markdown components={{ ...mdxComponents, code: CodeBlock }}>
      {children}
    </Markdown>
  );
}

export const Title = styled.h1`
  font-family: ${fonts.title};
  font-size: 3.5em;
`;

export const SubTitle = styled.h2`
  font-family: ${fonts.subtitle};
  font-size: 2em;
`;
