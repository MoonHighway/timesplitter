import { useLocation } from "react-router-dom";
import { NavigationBar, MDX } from "../../ui";
import { BookStyles } from "../../book-ui";
import { usePresenter } from "../../hooks";
import TopicTime from "./TopicTime";
import TopicIconInfo from "./TopicIconInfo";
import TopicTitle from "./TopicTitle";
import CourseProgressBar from "./CourseProgressBar";
import styled from "styled-components";

export default function Agenda() {
  let { pathname } = useLocation();
  const {
    md,
    topic: { title },
    prev,
    next,
  } = usePresenter(pathname);
  return (
    <Container>
      <TopicTime />
      <TopicIconInfo />
      <TopicTitle title={title} />
      <Contents>
        <CourseProgressBar />
        <BookStyles>
          <MDX>{md}</MDX>
          <NavigationBar prev={prev} next={next} />
        </BookStyles>
      </Contents>
    </Container>
  );
}

const Container = styled.article`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const Contents = styled.div`
  grid-area: 2 / 1 / 10 / 8;
`;
