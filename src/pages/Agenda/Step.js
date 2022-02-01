import { MDX } from "../../ui";
import { BookStyles } from "../../book-ui";
import TopicTime from "./TopicTime";
import TopicIconInfo from "./TopicIconInfo";
import TopicTitle from "./TopicTitle";
import styled from "styled-components";

export default function Step({
  title,
  time,
  breadcrumbs,
  nav,
  md,
  parentType,
}) {
  return (
    <Container>
      <TopicIconInfo type={parentType} />
      <TopicTitle title={title} breadcrumbs={breadcrumbs} />
      {/* <TopicTime total={time.est} /> */}
      <TopicTime total={60} actual={60} />
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
`;

const Contents = styled.div`
  grid-area: 2 / 1 / 8 / 6;
`;
