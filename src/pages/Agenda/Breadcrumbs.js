import { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const first = (arr = [], num) => arr.filter((_, i) => i < num);

export default function Breadcrumbs({ breadcrumbs = [] }) {
  const _breadcrumbs = useMemo(
    () =>
      breadcrumbs.map((text, i) => ({
        text,
        to: first(breadcrumbs, i + 1).join("/"),
      })),
    [breadcrumbs]
  );

  return (
    <Container>
      {_breadcrumbs.map(({ text, to }) => (
        <Link to={to}>{text}</Link>
      ))}
    </Container>
  );
}

const Container = styled.nav``;
