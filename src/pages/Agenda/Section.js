import styled from "styled-components";
import { StartButton, Row, Title } from "../../ui";
import { colors } from "../../theme";
import { TimeDisplay } from "../../lib";

export default function Section({ title, time }) {
  return (
    <Container>
      <StartButton />
      <Title>{title}</Title>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.meta};

  .timer-row {
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }

  .btn-start {
    position: fixed;
    top: 10px;
    right: 10px;
  }

  h1 {
    font-size: 5em;
    padding: 0.5em;
    padding-bottom: 0;
  }
`;
