import { useState } from "react";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { StartButton, SubTitle, Text } from "../../ui";
import { useTimesplitter } from "../../useTimesplitter";
import { fonts } from "../../theme";
import styled from "styled-components";
import Select from "react-select";

function options(duration) {
  const times = [];
  for (let i = 0; i < 250; i++) {
    let d = new Date();
    d.setMinutes(d.getMinutes() + duration + i);
    if (i === 0 || d.getMinutes() % 5 === 0)
      times.push({
        value: d,
        label: format(d, "h:mm aaa"),
      });
  }
  return times;
}

export default function CourseTime() {
  const { courseLength = 90, adjust = (f) => f } = useTimesplitter();
  const times = options(courseLength);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const chooseTime = function ({ value }) {
    setSelectedTime(times.find((time) => time.value === value));
  };
  return (
    <Container>
      <SubTitle>Course Length</SubTitle>
      <Text className="course-length">
        {formatDuration(
          intervalToDuration({ start: 0, end: courseLength * 60 * 1000 })
        )}
      </Text>
      <hr />
      <SubTitle>End Time</SubTitle>
      <Select
        className="time-select"
        options={times}
        value={selectedTime}
        onChange={chooseTime}
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
