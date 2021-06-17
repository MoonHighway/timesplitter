import styled from "styled-components";
import { fonts } from "../theme";
import { MdCheck } from "react-icons/md";

export const Success = ({ children }) => (
  <Container>
    <MdCheck size={42} fill="green" />
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
  background-color: #00800017;
  color: green;
  border: solid 1px green;
  border-left: solid 5px green;
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
