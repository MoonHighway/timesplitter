import styled from "styled-components";
import { fonts } from "../theme";
import { MdInfo } from "react-icons/md";

export const Info = ({ children }) => (
  <Container>
    <MdInfo size={32} fill="blue" />
    <span>{children}</span>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ${fonts.subtitle};
  h1 {
    font-family: ${fonts.title};
  }
  width: 500px;
  min-width: 500px;
  padding: 1em;
  background-color: #0000ff12;
  color: blue;
  border: solid 1px blue;
  border-left: solid 5px blue;
  margin: 1em;

  svg {
    flex-shrink: 0;
  }
  span {
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
