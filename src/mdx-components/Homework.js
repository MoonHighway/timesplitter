import styled from "styled-components";
import { fonts } from "../theme";
import { HiOutlineDocumentText } from "react-icons/hi";

export const Homework = ({ children }) => (
  <Container>
    <HiOutlineDocumentText size={42} stroke="orange" />
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
  background-color: #ffa5000f;
  color: orange;
  border: solid 1px orange;
  border-left: solid 5px orange;
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
