import styled from "styled-components";
import { fonts, colors } from "../theme";
import * as mdxComponents from "../mdx-components";
import Markdown from "@mdx-js/runtime";

export function MDX({ children }) {
  return <Markdown components={mdxComponents}>{children}</Markdown>;
}

export function TeacherEditionTitle({ title }) {
  const [two, one, ...rest] = title.split(" ").reverse();
  return (
    <Title>
      <h1>
        {rest.reverse().join(" ")}{" "}
        <span>
          {one} {two}
        </span>
      </h1>
      <h2>Teacher's Edition</h2>
    </Title>
  );
}

const Title = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h1 {
    font-family: ${fonts.subtitle};
    color: ${colors.primary};
  }

  h2 {
    font-size: 2em;
    color: ${colors.secondary};
    font-family: ${fonts.handwriting};
    text-align: center;
    align-self: flex-start;
  }

  span {
    display: block;
    font-size: 2.5em;
    font-family: ${fonts.title};
  }

  @media (orientation: landscape) {
    grid-area: 2 / 4 / 4 / 6;
  }

  @media (orientation: portrait) {
    grid-area: 3 / 4 / 5 / 6;
    margin-top: 30px;
  }
`;
