import Breadcrumbs from "./Breadcrumbs";
import { getTypeColor } from "../../theme";
import styled from "styled-components";

export default function TopicTitle({
  title = "Untitled Topic",
  type = "section",
  required = false,
  breadcrumbs = [],
}) {
  console.log(type);
  return (
    <Container type={type} required={required}>
      <h1>{title}</h1>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </Container>
  );
}

const Container = styled.div`
  grid-area: 1 / 3 / 2 / 9;
  background-color: ${getTypeColor};
  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h1 {
  }

  a {
    text-decoration: none;
    color: blue;
    &:after {
      content: " > ";
    }
    &:last-child {
      &:after {
        content: "";
      }
    }
  }
`;
