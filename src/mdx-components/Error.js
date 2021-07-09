import styled from "styled-components";
import { fonts } from "../theme";
import { MdError } from "react-icons/md";

export const Error = ({ children }) => (
  <Container>
    <MdError size={32} fill="red" />
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
  background-color: #ff7c7c66;
  color: #4d0000;
  border: solid 1px red;
  border-left: solid 5px red;
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
