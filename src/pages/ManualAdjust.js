import styled from "styled-components";
import { format } from "date-fns";
import { Title, Text, Row, RemoveButton, AdjustButton } from "../ui";
import { useTimesplitter } from "../useTimesplitter";

const samples = [
  { title: "this topic", time: { est: 5 } },
  { title: "that topic", time: { est: 2 } },
  { title: "the other topic", time: { est: 12 } },
  { title: "the main topic", time: { est: 3 } },
];

export default function ManualAdjust() {
  const {
    manualAdjustRequired = false,
    minsOverTime = 10,
    endTime = new Date(),
    remainingTopics = samples,
  } = useTimesplitter();

  const suggestEndTime = new Date(endTime.getTime() + minsOverTime * 60 * 1000);

  if (manualAdjustRequired)
    return (
      <Container>
        <div>
          <Title>Adjustment Required</Title>
          <Text className="description">
            There is not enough time to get to everything and end by{" "}
            <strong>{format(endTime, "h:mm aaa")}</strong>. We need to cut{" "}
            <strong>{minsOverTime}</strong> minutes from this course.
          </Text>
          <br />

          {remainingTopics.map((topic, i) => (
            <Row key={i} className="topic">
              <RemoveButton size={35} />
              <Text>
                {topic.time.est} mins - {topic.title}
              </Text>
            </Row>
          ))}
          <AdjustButton>
            end course at {format(suggestEndTime, "h:mm aaa")}
          </AdjustButton>
        </div>
      </Container>
    );

  return null;
}

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;

  p {
    font-size: 1.2em;
  }

  .btn-remove:hover + p {
    color: #999;
    text-decoration: line-through;
  }

  .topic {
    margin: 5px 0;
    display: flex;
    align-items: center;
    p {
      font-size: 1.5em;
      margin-left: 1em;
    }
  }

  .description {
    width: 420px;
  }

  > div {
    padding: 50px;
    border-radius: 50px;
    background-color: white;
    overflow-y: scroll;
  }
`;
