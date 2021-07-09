import styled from "styled-components";
import { fonts } from "./theme";
import "prismjs/themes/prism-tomorrow.css";

export const BookStyles = styled.div`
  font-family: ${fonts.text};
  margin: 2em;
  padding-bottom: 200px;
  width: 100%;

  code {
    background-color: black;
    padding: 3px;
  }

  pre {
    border-radius: 25px;
    font-size: 1.1em;
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
