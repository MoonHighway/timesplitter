import { useState, useEffect } from "react";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { StartButton, SubTitle, Text } from "../../ui";
import { TimeDropDown } from "../../lib";
import { useTimesplitter } from "../../useTimesplitter";
import { fonts } from "../../theme";
import styled from "styled-components";

//
// TODO: Create Custom Hook for start and end times
//
//  There is a lot of code here that has to do with updating the
//  start and end times based on a clock, all that code should be
//  encapsulated into it's own hook.
//
//  Consider putting start and end times into useTimesplitter
//
//  Change the time drop downs to have same labels and values
//

export default function CourseTime() {
  const { courseLength, actions } = useTimesplitter();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const chooseStartTime = function (time) {
    const dStart = new Date(time.value);
    const endTime = {};
    endTime.value = dStart.getTime() + courseLength * 60 * 1000;
    endTime.offsetMinutes = time.offsetMinutes + courseLength;
    endTime.label = format(endTime.value, "h:mm aaa");
    setStartTime(time);
    setEndTime(endTime);
    actions.adjust(0, time.value.getTime());
  };

  const chooseEndTime = function (time) {
    console.log("TODO: Handle End Time Selection");
    console.log(time);
    setEndTime(time);

    //
    //actions.adjust(length);
    //
  };

  useEffect(() => {
    let tsRender = new Date();
    const iCheckStart = setInterval(() => {
      const now = new Date();
      if (!startTime) {
        if (tsRender.getMinutes() !== now.getMinutes()) {
          actions.adjust(0, now.getTime());
          tsRender = new Date();
        }
        return;
      }

      if (now > startTime.value) {
        setStartTime();
        actions.adjust(0, now.getTime());
        tsRender = new Date();
        return;
      }
    }, 3000);
    return () => clearInterval(iCheckStart);
  }, [startTime]);

  return (
    <Container>
      <SubTitle>Course Length</SubTitle>
      <Text className="course-length">
        {formatDuration(
          intervalToDuration({ start: 0, end: courseLength * 60 * 1000 })
        )}
      </Text>
      <hr />
      <SubTitle>Start</SubTitle>
      <TimeDropDown
        className="time-select"
        value={startTime}
        onChange={chooseStartTime}
      />
      <SubTitle>End</SubTitle>
      <TimeDropDown
        className="time-select"
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
