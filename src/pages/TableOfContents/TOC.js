import CourseTitle from "./CourseTitle";
import Section from "./Section";
import { Timer, SubTitle, Row } from "../../ui";
import { format } from "date-fns";
import { urlFriendly } from "../../lib";
import { useTimesplitter } from "../../useTimesplitter";
import styled from "styled-components";

export default function TOC() {
  const { courseLength, time, agenda } = useTimesplitter();

  let endTime;
  if (time) {
    endTime = new Date(time.start + courseLength * 60 * 1000);
  }

  if (!agenda) return null;
  return (
    <Container>
      <CourseTitle />
      {agenda.map((section, i) => (
        <Section key={urlFriendly(section.title)} section={section} />
      ))}
      <Row className="end-row">
        <Timer size={30} className="end-clock" />
        <SubTitle className="end-time">
          {endTime && format(endTime, "h:mm aa")}
        </SubTitle>
        <SubTitle className="end-title">END</SubTitle>
      </Row>
    </Container>
  );
}

const Container = styled.section`
  .end-row {
    margin: 1em;
    margin-left: 2em;
  }

  .end-time {
    margin-right: 1em;
  }

  .end-title {
    &:before {
      content: "-";
      margin-right: 1em;
    }
  }

  .end-clock {
    margin-right: 1em;
  }
`;
