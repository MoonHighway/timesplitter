import styled from "styled-components";
import { Column } from "../ui";
import { fonts } from "../theme";
import { FaQuestion } from "react-icons/fa";

export const Question = ({ children, title = "" }) => (
  <Container>
    <FaQuestion size={42} stroke="#ff00f4" />
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
    font-size: 1.5em !important;
  }

  width: 500px;
  min-width: 500px;
  padding: 1em;
  background-color: #ff00f424;
  color: #ff00f4;
  border: solid 1px #ff00f4;
  border-left: solid 5px #ff00f4;
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
