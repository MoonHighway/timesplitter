import { useState, useEffect, useRef, useMemo } from "react";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { StartButton, SubTitle, Text, AdjustedTimeIndicator } from "../../ui";
import { TimeDropDown } from "../../lib";
import { useTimesplitter } from "../../useTimesplitter";
import { fonts } from "../../theme";
import styled from "styled-components";

export default function CourseTime() {
  const { courseLength, actions } = useTimesplitter();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const OCL = useRef(0);
  const today = useMemo(() => format(new Date(), "MM/dd/yyyy"), []);

  useEffect(() => {
    if (OCL.current !== 0) return;
    OCL.current = courseLength;
  }, [courseLength]);

  useEffect(() => {
    if (endTime) return;
    const start = new Date();
    setStartTime(format(start, "h:mm aaa"));
    if (!courseLength) return;
    const end = start.getTime() + courseLength * 60 * 1000;
    setEndTime(format(end, "h:mm aaa"));
  }, [courseLength]);

  const chooseStartTime = function ({ value }) {
    const uStart = new Date(`${today} ${value}`);
    const uEnd = new Date(uStart.getTime() + courseLength * 60 * 1000);
    setStartTime(format(uStart, "h:mm aaa"));
    setEndTime(format(uEnd, "h:mm aaa"));
    actions.adjust(0, uStart.getTime());
  };

  const chooseEndTime = function ({ value }) {
    const uEnd = new Date(`${today} ${value}`);
    const uStart = new Date(`${today} ${startTime}`);
    const length = (uEnd - uStart) / 60000 - courseLength;
    setEndTime(format(uEnd, "h:mm aaa"));
    actions.adjust(length, uStart.getTime());
  };

  useEffect(() => {
    if (!startTime) return;
    let tsRender = new Date(`${today} ${startTime}`);
    const iCheckStart = setInterval(() => {
      const now = new Date();
      if (tsRender.getMinutes() !== now.getMinutes()) {
        tsRender = now;
        chooseStartTime({ value: format(now, "h:mm aaa") });
        actions.adjust(0, now.getTime());
      }
    }, 3000);
    return () => clearInterval(iCheckStart);
  }, [startTime, courseLength]);

  return (
    <Container>
      <SubTitle>Course Length</SubTitle>
      <Text className="course-length">
        {formatDuration(
          intervalToDuration({ start: 0, end: courseLength * 60 * 1000 })
        )}
      </Text>
      {!!OCL.current && (
        <AdjustedTimeIndicator adjusted={courseLength - OCL.current} />
      )}
      <hr />
      <SubTitle>Start</SubTitle>
      <TimeDropDown
        className="time-select"
        length={courseLength}
        value={startTime}
        onChange={chooseStartTime}
      />
      <SubTitle>End</SubTitle>
      <TimeDropDown
        className="time-select"
        length={courseLength}
        delay={courseLength}
        value={endTime}
        onChange={chooseEndTime}
      />
      <StartButton />
    </Container>
  );
}

const Container = styled.div`
  padding: 1em;
  .time-select,
  .course-length {
    width: 300px;
    font-family: ${fonts.text};
    font-weight: bold;
    font-size: 1.4em;
  }
`;
