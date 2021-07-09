import styled from "styled-components";
import { fonts } from "../theme";
import { TiWarningOutline } from "react-icons/ti";

export const Warning = ({ children }) => (
  <Container>
    <TiWarningOutline size={32} fill="#ff9800" />
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
  background-color: #ffca7c66;
  color: #4d2d00;
  border: solid 1px #ff9800;
  border-left: solid 5px #ff9800;
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
