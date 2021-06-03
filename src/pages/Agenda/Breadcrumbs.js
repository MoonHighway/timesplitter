import { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const first = (arr = [], num) => arr.filter((_, i) => i < num);

export default function Breadcrumbs({ breadcrumbs = [] }) {
  const [, ...bread] = breadcrumbs;
  const _breadcrumbs = useMemo(
    () =>
      bread.map((text, i) => ({
        text,
        to: first(bread, i + 1).join("/"),
      })),
    [bread]
  );

  return (
    <Container>
      {_breadcrumbs.map(({ text, to }) => (
        <Link key={to} to={to}>
          {text}
        </Link>
      ))}
    </Container>
  );
}

const Container = styled.nav``;
