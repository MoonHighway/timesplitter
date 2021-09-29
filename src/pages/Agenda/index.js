import { useLocation } from "react-router-dom";
import { NavigationBar, MDX } from "../../ui";
import { BookStyles } from "../../book-ui";
import { usePresenter } from "../../hooks";
import Section from "./Section";
import Exercise from "./Exercise";
import Lab from "./Lab";
import TopicTime from "./TopicTime";
import TopicIconInfo from "./TopicIconInfo";
import TopicTitle from "./TopicTitle";
import CourseProgressBar from "./CourseProgressBar";
import styled from "styled-components";

export default function Agenda() {
  let { pathname } = useLocation();
  const presenter = usePresenter(pathname);

  if (presenter) {
    const {
      md,
      prev,
      next,
      topic: { title, time, type, required, breadcrumbs },
      prevTopic,
      nextTopic,
    } = presenter;

    const nav = <NavigationBar
    onNext={next}
    onPrev={prev}
    next={{
      to: !nextTopic && "/end",
      text: nextTopic ? nextTopic.title : "End Course",
    }}
    prev={{
      to: !prevTopic && "/overview",
      text: prevTopic ? prevTopic.title : "Course Overview",
    }}
  />


    if (type === "section") {
      return <>
        <Section title={title} time={time} />
        {nav}
        </>
    }

    if (type === "exercise") {
      return <>
        <Exercise title={title} time={time} />
        {nav}
        </>
    }

    if (type === "lab") {
      return <>
      <Lab title={title} time={time} />
      {nav}
      </>
    }

    return (
      <Container>
        <TopicTime title={title} {...time} />
        <TopicIconInfo />
        <TopicTitle
          title={title}
          type={type}
          required={required}
          breadcrumbs={breadcrumbs}
        />
        <Contents>
          <CourseProgressBar />
          <BookStyles>
            <MDX>{md}</MDX>
            {nav}
          </BookStyles>
        </Contents>
      </Container>
    );
  }

  return null;
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
