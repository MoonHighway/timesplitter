import { formatDuration, intervalToDuration } from "date-fns";
import { StartButton, Text } from "../../ui";
import { useTimesplitter } from "../../useTimesplitter";
import styled from "styled-components";

const format = "h:mm a";

export default function CourseTime() {
  const { courseLength = 90 } = useTimesplitter();

  function onChange(...args) {
    console.log("time change");
  }

  return (
    <Container>
      <Text>
        Course Length
        <br />
        {formatDuration(
          intervalToDuration({ start: 0, end: courseLength * 60 * 1000 })
        )}
      </Text>
      <hr />
      <Text>End Time</Text>
      <StartButton />
    </Container>
  );
}

const Container = styled.div`
  padding: 1em;
`;
