import styled from "styled-components";

export default function Breadcrumbs({
  route = ["sample chapter", "sample section", "sample subsection"],
}) {
  return (
    <Container>
      {route.map((text) => (
        <a href="/">{text}</a>
      ))}
    </Container>
  );
}

const Container = styled.nav``;
