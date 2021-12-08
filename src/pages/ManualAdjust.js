import styled from "styled-components";
import { format } from "date-fns";
import { Title, Text, Row, RemoveButton, AdjustButton } from "../ui";
import { useTimesplitter } from "../useTimesplitter";

export default function ManualAdjust() {
  const { adjust } = useTimesplitter();
  if (adjust && adjust.manualAdjust) {
    const suggestEndTime = new Date(
      adjust.endTime.getTime() + adjust.minsOver * 60 * 1000
    );
    return (
      <Container>
        <div>
          <Title>Adjustment Required</Title>
          <Text className="description">
            There is not enough time to get to everything and end by{" "}
            <strong>{format(adjust.endTime, "h:mm aaa")}</strong>. We need to
            cut <strong>{adjust.minsOver}</strong> minutes from this course.
          </Text>
          <br />

          {adjust.remainingTopics.map((topic, i) => (
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
  }

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
