import { useLocation } from "react-router-dom";
import { NavigationBar, MDX, StartButton } from "../../ui";
import { BookStyles } from "../../book-ui";
import { usePresenter } from "../../hooks";
import Section from "./Section";
import Exercise from "./Exercise";
import Lab from "./Lab";
import Meta from "./Meta";
import Slides from "./Slides";
import Sample from "./Sample";
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

    const nav = (
      <NavigationBar
        onNext={next}
        onPrev={prev}
        next={{
          to: !nextTopic && "/",
          text: nextTopic ? nextTopic.title : "Contents",
        }}
        prev={{
          to: !prevTopic && "/",
          text: prevTopic ? prevTopic.title : "Contents",
        }}
      />
    );

    if (type === "slides") {
      return (
        <>
          <Slides title={title} time={time} />
          {nav}
        </>
      );
    }

    if (type === "meta") {
      return (
        <>
          <Meta title={title} time={time} />
          {nav}
        </>
      );
    }

    if (type === "section") {
      return (
        <>
          <Section title={title} time={time} />
          {nav}
        </>
      );
    }

    if (type === "exercise") {
      return (
        <>
          <Exercise title={title} time={time} />
          {nav}
        </>
      );
    }

    if (type === "lab") {
      return (
        <>
          <Lab title={title} time={time} />
          {nav}
        </>
      );
    }

    if (type === "sample") {
      return (
        <>
          <Sample title={title} time={time} />
          {nav}
        </>
      );
    }

    return (
      <Container>
        <StartButton />
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

  .btn-start {
    position: fixed;
    top: 0;
    right: 0;
  }
`;

const Contents = styled.div`
  grid-area: 2 / 1 / 10 / 8;
`;
