import { useHistory } from "react-router-dom";
import styled from "styled-components";

const PreviousLink = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

const NextLink = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export const NavigationBar = ({
  prev,
  next,
  onPrev = (f) => f,
  onNext = (f) => f,
}) => {
  const history = useHistory();

  const p = prev.to ? () => history.push(prev.to) : onPrev;
  const n = next.to ? () => history.push(next.to) : onNext;

  return (
    <Container>
      <PreviousLink onClick={p}>{prev.text}</PreviousLink>
      <NextLink onClick={n}>{next.text}</NextLink>
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  left: 0;

  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 67%,
    rgba(255, 255, 255, 1) 54%
  );

  button:after {
    content: "previous";
    border-top: solid 2px black;
    display: block;
    width: 150%;
    text-align: right;
    font-size: 0.6em;
    color: blue;
  }
  button {
    cursor: pointer;
    background: none;
    border: none;
    position: relative;
    text-decoration: none;
    margin: 0.25em;
    color: blue;
    font-size: 0.8em;

    &:last-of-type {
      right: 10%;
      :after {
        content: "next";
      }
    }
  }
`;
