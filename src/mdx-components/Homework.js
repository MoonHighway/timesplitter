import styled from "styled-components";
import { Column } from "../ui";
import { fonts } from "../theme";
import { HiOutlineDocumentText } from "react-icons/hi";

export const Homework = ({ children, title = "" }) => (
  <Container>
    <HiOutlineDocumentText size={42} stroke="orange" />
    <Column>
      {title && <h2>{title}</h2>}
      <span>{children}</span>
    </Column>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: ${fonts.subtitle};
  h2 {
    font-family: ${fonts.title};
    margin-bottom: 0;
    margin-left: 10px;
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
