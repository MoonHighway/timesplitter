import styled from "styled-components";
import { fonts } from "./theme";
import "prismjs/themes/prism-tomorrow.css";

export const BookStyles = styled.div`
  font-family: ${fonts.text};
  font-size: 1.5em;
  margin: 2em;
  padding-bottom: 200px;
  width: 100%;

  pre {
    position: relative;
    right: -4.2em;
    margin: 1em;
    padding: 1em;
    background-color: black;
    border-radius: 2px;
    font-size: 0.75em;
  }

  h1 {
    font-family: ${fonts.title};
    font-size: 3.5em;
    margin-bottom: 0.25em;
  }

  h2 {
    font-family: ${fonts.subtitle};
    font-size: 2em;
    margin-bottom: 1em;
  }

  p {
    margin-bottom: 2em;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    margin-left: 2em;
  }
`;
