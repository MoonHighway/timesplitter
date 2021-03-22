import styled from "styled-components";
import { fonts } from "./theme";

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

export const Warning = styled.div`
  font-family: ${fonts.text};
  h1 {
    font-family: ${fonts.title};
  }
  padding: 1em;
  border: solid 1px black;
  background-color: red;
  color: white;
`;
