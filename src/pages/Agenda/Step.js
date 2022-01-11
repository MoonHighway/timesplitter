import { MDX, StartButton } from "../../ui";
import { BookStyles } from "../../book-ui";
import TopicTime from "./TopicTime";
import TopicIconInfo from "./TopicIconInfo";
import TopicTitle from "./TopicTitle";
import styled from "styled-components";

export default function Step({
  title,
  time,
  breadcrumbs,
  type,
  required,
  nav,
  md,
  parentType,
}) {
  return (
    <Container>
      <StartButton />
      <TopicIconInfo type={parentType} />
      <TopicTitle
        title={title}
        type={type}
        required={required}
        breadcrumbs={breadcrumbs}
      />
      <TopicTime title={title} {...time} />
      <Contents>
        <BookStyles>
          <MDX>{md}</MDX>
          {nav}
        </BookStyles>
      </Contents>
    </Container>
  );
}

const Container = styled.article`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(7, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  .btn-start {
    position: fixed;
    top: 120px;
    right: 10px;
  }
`;

const Contents = styled.div`
  grid-area: 2 / 2 / 8 / 6;
`;
