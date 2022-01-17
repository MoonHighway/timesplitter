import CourseProgressBar from "./CourseProgressBar";
import { Title, Row } from "../../ui";
import styled from "styled-components";

export default function TopicTitle({ title = "Untitled Topic" }) {
  return (
    <Container>
      <Row>
        <Title>{title}</Title>
      </Row>
      <CourseProgressBar />
    </Container>
  );
}

const Container = styled.div`
  grid-area: 1 / 2 / 2 / 6;
  display: flex;
  padding: 1em;
  flex-direction: column;

  h1 {
    font-size: 3.5em;
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
