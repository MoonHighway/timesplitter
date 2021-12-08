import styled from "styled-components";
import { StartButton, Row, TopicIcon, Title } from "../../ui";
import { colors } from "../../theme";
import { TimeDisplay } from "../../lib";

export default function Section({ title, time }) {
  return (
    <Container>
      <StartButton />
      <Row className="title-row">
        <TopicIcon size={120} type="section" fill="black" />
        <Title>{title}</Title>
      </Row>
      <Row className="timer-row">
        <TimeDisplay time={time.est} size={50} color="black" />
      </Row>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.slides};

  .timer-row {
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }

  .title-row {
    justify-content: center;
    align-items: center;
  }

  .btn-start {
    position: fixed;
    top: 10px;
    right: 10px;
  }

  h1 {
    font-size: 5em;
    padding: 0.5em;
    padding-bottom: 0px;
  }
`;
