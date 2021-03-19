import { Link } from "react-router-dom";
import styled from "styled-components";

const PreviousLink = ({ to, children }) => <Link to={to}>{children}</Link>;

const NextLink = ({ to, children }) => <Link to={to}>{children}</Link>;

export const NavigationBar = ({ prev, next }) => (
  <Container>
    <PreviousLink to={prev.to}>{prev.text}</PreviousLink>
    <NextLink to={next.to}>{next.text}</NextLink>
  </Container>
);

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

  a:after {
    content: "previous";
    border-top: solid 2px black;
    display: block;
    width: 150%;
    text-align: right;
    font-size: 0.6em;
    color: blue;
  }
  a {
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
